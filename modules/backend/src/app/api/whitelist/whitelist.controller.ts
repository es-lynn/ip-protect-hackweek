import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  UnauthorizedException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ProjectType } from '../../core/model/models/project.type'
import { PrismaService } from '../../core/prisma/prisma.service'
import { AwsIpSet } from '../../core/services/aws/aws-ipset/aws-ipset'
import { WhitelistProjectParam, WhitelistProjectQuery, WhitelistProjectRes } from './whitelist.dto'

@ApiTags('/whitelist')
@Controller('/whitelist')
export class WhitelistController {
  constructor(private db: PrismaService) {}

  /**
   * eg. /whitelist/renewalre?ipv4=192.168.1.1
   * Returns 200 if provided IP address is whitelisted
   * Returns 404 if provided IP address
   * */
  @HttpCode(200)
  @Get('/:projectFriendlyId')
  async search(
    @Param() param: WhitelistProjectParam,
    @Query() query: WhitelistProjectQuery
  ): Promise<WhitelistProjectRes> {
    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType

    let isWhitelisted = false
    if (!query.ipv4 && !query.ipv6) {
      throw new BadRequestException('Must provide either ipv4 or ipv6')
    }

    if (query.ipv4) {
      const awsIpSet = this.getAwsIpSet(project, true)
      const ipAddresses = await awsIpSet.getCachedIpAddressesForIpset(project.config.ipset.id)
      isWhitelisted = ipAddresses.IPSet.Addresses.some(ip => ip.split('/')[0] === query.ipv4)
    }
    if (query.ipv6) {
      const awsIpSetV6 = this.getAwsIpSet(project, false)
      const ipAddressesV6 = await awsIpSetV6.getCachedIpAddressesForIpset(project.config.ipsetV6.id)
      isWhitelisted = ipAddressesV6.IPSet.Addresses.some(ip => ip.split('/')[0] === query.ipv6)
    }

    return {
      isWhitelisted: isWhitelisted
    }
  }

  private getAwsIpSet(project: ProjectType, isV4: boolean): AwsIpSet {
    return new AwsIpSet({
      accessKeyId: project.awsAccessKey,
      secretAccessKey: project.awsSecret,
      id: isV4 ? project.config.ipset.id : project.config.ipsetV6.id,
      name: isV4 ? project.config.ipset.name : project.config.ipsetV6.name,
      region: isV4 ? project.config.ipset.region : project.config.ipsetV6.region
    })
  }
}
