import { Logger } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { IPSet, LockToken } from 'aws-sdk/clients/wafv2'
import { MemoryCache, MethodCacheService } from 'ts-method-cache'

import { arr } from '../../../../../commons/utils/ArrayUtil'
import { regex } from '../../../../../commons/utils/Regex'
import { Config } from './aws-ipset.types'

const cacheService = new MethodCacheService()

export class AwsIpSet {
  private readonly client: AWS.WAFV2
  private readonly logger = new Logger(AwsIpSet.name)
  constructor(private config: Config) {
    this.client = new AWS.WAFV2({
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey
      },
      region: this.config.region
    })
  }

  async getIpAddressesForIpset(): Promise<{
    IPSet: IPSet
    LockToken: LockToken
  }> {
    this.logger.log('[getIpAddressesForIpset] Retrieving IPSet for ' + this.config.name)
    const { IPSet, LockToken } = await this.client
      .getIPSet({
        Name: this.config.name,
        Id: this.config.id,
        // HACK: Missed out this option; hardcoding us-east-1 = CLOUDFRONT
        Scope: this.config.region === 'us-east-1' ? 'CLOUDFRONT' : 'REGIONAL'
      })
      .promise()
    if (IPSet == null || LockToken == null) {
      throw Error()
    }
    return {
      IPSet,
      LockToken
    }
  }

  @MemoryCache({ ttl: 60, key: 'getCachedIpAddressesForIpset' })
  async getCachedIpAddressesForIpset(_cacheKey: string): Promise<{
    IPSet: IPSet
    LockToken: LockToken
  }> {
    return this.getIpAddressesForIpset()
  }

  async addIpAddressesToIpset(ipAddress: string | string[]): Promise<void> {
    const ipAddresses = formatIpAddress(ipAddress)
    const { LockToken, IPSet } = await this.getIpAddressesForIpset()
    await this.client
      .updateIPSet({
        Description: IPSet.Description,
        Addresses: [...IPSet.Addresses, ...ipAddresses],
        Id: this.config.id,
        LockToken: LockToken,
        Name: this.config.name,
        // HACK: Missed out this option; hardcoding us-east-1 = CLOUDFRONT
        Scope: this.config.region === 'us-east-1' ? 'CLOUDFRONT' : 'REGIONAL'
      })
      .promise()
    cacheService.clearMemoryKeyCache('getCachedIpAddressesForIpset')
    this.logger.log(`[addIpAddressesToIpset] Cleared cached for key: getCachedIpAddressesForIpset`)
  }

  async removeIpAddressesFromIpset(ipAddress: string | string[]): Promise<void> {
    const ipAddresses = formatIpAddress(ipAddress)
    const { LockToken, IPSet } = await this.getIpAddressesForIpset()
    const finalAddresses = arr.difference(IPSet.Addresses, ipAddresses)
    await this.client
      .updateIPSet({
        Description: IPSet.Description,
        Addresses: finalAddresses,
        Id: this.config.id,
        LockToken: LockToken,
        Name: this.config.name,
        // HACK: Missed out this option; hardcoding us-east-1 = CLOUDFRONT
        Scope: this.config.region === 'us-east-1' ? 'CLOUDFRONT' : 'REGIONAL'
      })
      .promise()

    cacheService.clearMemoryKeyCache('getCachedIpAddressesForIpset')
    this.logger.log(
      `[removeIpAddressesFromIpset] Cleared cached for key: getCachedIpAddressesForIpset`
    )
  }
}

function formatIpAddress(ipAddress: string | string[]): string[] {
  const ipAddresses = arr.arrayify(ipAddress)
  return ipAddresses.map(ip => {
    if (regex.ipv4.test(ip)) {
      return `${ip}/32`
    } else if (regex.ipv6.test(ip)) {
      return `${ip}/128`
    }
    throw Error(`Must be a valid IPv4 or IPv6 address: ${ip}`)
  })
}
