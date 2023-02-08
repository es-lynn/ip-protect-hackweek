import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { regex } from '../../../../commons/utils/Regex'
import { AuthorizationService } from '../../../core/authorization/authorization.service'
import { ConfigService } from '../../../core/config/config.service'
import { AuthUser } from '../../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../../core/guards/decorators/UseAuthGuard'
import { ModelService } from '../../../core/model/model.service'
import { ProjectType } from '../../../core/model/models/project.type'
import { AwsIpSet } from '../../../core/services/aws/aws-ipset/aws-ipset'
import {
  IpAddressAddBody,
  IpAddressAddParam,
  IpAddressAddRes,
  IpAddressListParam,
  IpAddressListRes,
  IpAddressRemoveBody,
  IpAddressRemoveParam,
  IpAddressRemoveRes,
  IpAddressReportParam,
  IpAddressReportRes,
  IpAddressWhitelistedParam,
  IpAddressWhitelistedQuery,
  IpAddressWhitelistedRes
} from './ip-address.dto'

@UseAuthGuard()
@ApiTags('/project/:projectFriendlyId')
@Controller('/project/:projectFriendlyId')
export class IpAddressController {
  constructor(
    private db: ModelService,
    private cfg: ConfigService,
    private authorization: AuthorizationService
  ) {}

  @HttpCode(200)
  @Get('/user/@me/ip-address/list')
  async list(
    @Param() param: IpAddressListParam,
    @AuthUser() user: User
  ): Promise<IpAddressListRes> {
    await this.authorization.assertUserBelongsProject(user, param.projectFriendlyId)

    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType

    const projectUser = await this.db.projectUser.findUniqueOrThrow({
      where: {
        projectId_userId: {
          userId: user.id,
          projectId: await this.db.project.findId(param.projectFriendlyId)
        }
      },
      include: { ipAddresses: true }
    })

    const awsIpSetV4 = this.getAwsIpSet(project, true)
    const ipAddressesV4 = await awsIpSetV4.getCachedIpAddressesForIpset(project.config.ipset.id)
    const ipAddresses = [...ipAddressesV4.IPSet.Addresses]

    if (this.hasIpsetV6Config(project)) {
      const awsIpSetV6 = this.getAwsIpSet(project, false)
      const ipAddressesV6 = await awsIpSetV6.getCachedIpAddressesForIpset(project.config.ipsetV6.id)
      ipAddresses.push(...ipAddressesV6.IPSet.Addresses)
    }

    return {
      ipAddresses: projectUser.ipAddresses.map(it => ({
        id: it.id,
        ip: it.ipAddress,
        tag: it.tag,
        createdAt: it.createdAt,
        synced: ipAddresses.some(ip => ip.split('/')[0] === it.ipAddress)
      }))
    }
  }

  @HttpCode(201)
  @Post('/user/@me/ip-address/add')
  async add(
    @Param() param: IpAddressAddParam,
    @Body() body: IpAddressAddBody,
    @AuthUser() user: User
  ): Promise<IpAddressAddRes> {
    await this.authorization.assertUserBelongsProject(user, param.projectFriendlyId)

    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType
    const projectUser = await this.db.projectUser.findUniqueOrThrow({
      where: {
        projectId_userId: {
          userId: user.id,
          projectId: project.id
        }
      }
    })

    const isV4 = regex.ipv4.test(body.ip)
    if (!isV4 && !this.hasIpsetV6Config(project)) {
      throw new BadRequestException(`Project ${project.friendlyId} does not support IPv6`)
    }

    const awsIpSet = this.getAwsIpSet(project, isV4)
    await awsIpSet.addIpAddressesToIpset(body.ip)
    const ipAddress = await this.db.ipAddress.create({
      data: {
        ipAddress: body.ip,
        tag: body.tag,
        projectId: project.id,
        projectUserId: projectUser.id
      }
    })
    return {
      ipAddress: {
        ip: ipAddress.ipAddress,
        tag: ipAddress.tag,
        id: ipAddress.id,
        createdAt: ipAddress.createdAt
      }
    }
  }

  // @HttpCode(200)
  // @Post('/:ipAddressId/edit')
  // async edit(
  //   @Param() param: EditParam,
  //   @Body() body: EditBody
  // ): Promise<EditRes> {
  //   const ipAddress = await this.db.ipAddress.update({
  //     where: { id: param.ipAddressId },
  //     data: {
  //       ipAddress: body.ip,
  //       tag: body.tag
  //     }
  //   })
  //   return {
  //     ipAddress: {
  //       ip: ipAddress.ipAddress,
  //       tag: ipAddress.tag,
  //       id: ipAddress.id
  //     }
  //   }
  // }

  @HttpCode(200)
  @Post('/user/@me/ip-address/remove')
  async remove(
    @AuthUser() user: User,
    @Param() param: IpAddressRemoveParam,
    @Body() body: IpAddressRemoveBody
  ): Promise<IpAddressRemoveRes> {
    await this.authorization.assertUserBelongsProject(user, param.projectFriendlyId)

    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType

    const isV4 = regex.ipv4.test(body.ipAddress)
    const awsIpSet = this.getAwsIpSet(project, isV4)
    await awsIpSet.removeIpAddressesFromIpset(body.ipAddress)
    await this.db.ipAddress.deleteMany({
      where: {
        projectId: project.id,
        ipAddress: body.ipAddress
      }
    })
    return {}
  }

  // @HttpCode(200)
  // @Post(':ipAddressId/sync')
  // async sync(@Param() param: IpAddressSyncParam): Promise<IpAddressSyncRes> {
  //   const project = (await this.db.project.findUniqueOrThrow({
  //     where: { friendlyId: param.projectFriendlyId }
  //   })) as ProjectType
  //   const ipAddresses = await this.db.ipAddress.findUniqueOrThrow({
  //     where: { id: param.ipAddressId }
  //   })
  //
  //   const awsIpSet = new AwsIpSet({
  //     accessKeyId: this.cfg.aws.access_key_id,
  //     secretAccessKey: this.cfg.aws.secret_access_key,
  //     id: project.config.ipset.id,
  //     name: project.config.ipset.name,
  //     region: project.config.ipset.region
  //   })
  //   await awsIpSet.addIpAddressesToIpset(ipAddresses.ipAddress)
  //
  //   return {}
  // }

  // FIXME: This function is due for a refactor
  // NOTE: There's an edgecase in there about whether IP address is synced or not
  @HttpCode(200)
  @Get('/user/@me/ip-address/whitelisted')
  async whitelisted(
    @Param() param: IpAddressWhitelistedParam,
    @Query() query: IpAddressWhitelistedQuery,
    @AuthUser() user: User
  ): Promise<IpAddressWhitelistedRes> {
    await this.authorization.assertUserBelongsProject(user, param.projectFriendlyId)

    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType

    const isV4 = regex.ipv4.test(query.ipAddress)
    if (!this.hasIpsetV6Config(project) && !isV4) {
      // cannot check IPv6
      return {
        isWhitelisted: false
      }
    }

    const awsIpSet = this.getAwsIpSet(project, isV4)
    const ipAddresses = await awsIpSet.getCachedIpAddressesForIpset(project.config.ipset.id)
    const isWhitelisted = ipAddresses.IPSet.Addresses.some(
      ip => ip.split('/')[0] === query.ipAddress
    )

    const projectIpAddress = await this.db.ipAddress.findFirst({
      where: { ipAddress: query.ipAddress, projectId: project.id },
      include: {
        projectUser: {
          include: { user: true }
        }
      }
    })

    const response: IpAddressWhitelistedRes = {
      isWhitelisted: isWhitelisted
    }
    if (projectIpAddress) {
      response.ipAddress = {
        ip: projectIpAddress.ipAddress,
        tag: projectIpAddress.tag,
        id: projectIpAddress.tag,
        createdAt: projectIpAddress.createdAt
      }
      response.user = {
        id: projectIpAddress.projectUser.user.id,
        name: projectIpAddress.projectUser.user.name,
        provider: projectIpAddress.projectUser.user.provider,
        providerId: projectIpAddress.projectUser.user.providerId
      }
      response.isMyIp = user.id === projectIpAddress.projectUser.user.id
    }
    return response
  }

  @HttpCode(200)
  @Get('/ip-address/report')
  async view(
    @AuthUser() user: User,
    @Param() param: IpAddressReportParam
  ): Promise<IpAddressReportRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType
    const dbIpAddresses = await this.db.ipAddress.findMany({
      where: {
        projectId: project.id
      },
      include: {
        projectUser: {
          include: {
            user: true
          }
        }
      }
    })
    const awsIpSetV4 = this.getAwsIpSet(project, true)
    const ipAddressesV4 = await awsIpSetV4.getCachedIpAddressesForIpset(project.config.ipset.id)

    const awsIpSetV6 = this.getAwsIpSet(project, false)
    const ipAddressesV6 = await awsIpSetV6.getCachedIpAddressesForIpset(project.config.ipsetV6.id)

    const ipAddresses = [...ipAddressesV4.IPSet.Addresses, ...ipAddressesV6.IPSet.Addresses]

    const report = ipAddresses
      .map(ip => {
        const ipAddress = ip.split('/')[0]
        const dbIpAddress = dbIpAddresses.find(dbIpAddress => dbIpAddress.ipAddress === ipAddress)
        const user = dbIpAddress?.projectUser.user
        return {
          ip: ip.split('/')[0],
          tag: dbIpAddress?.tag,
          user: user
            ? {
                name: user.name,
                provider: user.provider,
                providerId: user.providerId
              }
            : undefined
        }
      })
      .sort(it => (it.user ? -1 : 1))

    return {
      report: report
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

  private hasIpsetV6Config(project: ProjectType): boolean {
    const ipsetV6 = project.config?.ipsetV6
    return !!ipsetV6?.id && !!ipsetV6?.name && !!ipsetV6?.region
  }
}
