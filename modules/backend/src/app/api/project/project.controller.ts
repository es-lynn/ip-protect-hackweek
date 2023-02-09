import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { AuthorizationService } from '../../core/authorization/authorization.service'
import { AuthUser } from '../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../core/guards/decorators/UseAuthGuard'
import { ProjectType } from '../../core/model/models/project.type'
import { PrismaService } from '../../core/prisma/prisma.service'
import {
  ProjectCreateBody,
  ProjectCreateRes,
  ProjectDeleteParam,
  ProjectDeleteRes,
  ProjectEditBody,
  ProjectEditParam,
  ProjectEditRes,
  ProjectViewParam,
  ProjectViewRes
} from './project.dto'
import { mapProjectToRes } from './project.util'

@UseAuthGuard()
@ApiTags('/project')
@Controller('/project')
export class ProjectController {
  constructor(private prisma: PrismaService, private authorization: AuthorizationService) {}

  @HttpCode(200)
  @Post('/create')
  async create(@AuthUser() user: User, @Body() body: ProjectCreateBody): Promise<ProjectCreateRes> {
    const project = (await this.prisma.project.create({
      data: {
        friendlyId: body.friendlyId,
        awsAccessKey: body.awsAccessKey,
        awsSecret: body.awsSecret,
        ipType: body.ipType,
        config: {
          ipset: {
            id: body.ipset.id,
            name: body.ipset.name,
            region: body.ipset.region
          },
          ipsetV6: {
            id: body.ipsetV6.id,
            name: body.ipsetV6.name,
            region: body.ipsetV6.region
          }
        }
      }
    })) as ProjectType
    await this.prisma.projectUser.create({
      data: {
        projectId: project.id,
        userId: user.id,
        isAdmin: true
      }
    })

    return {
      project: mapProjectToRes(project)
    }
  }

  @HttpCode(200)
  @Patch('/:projectFriendlyId/edit')
  async edit(
    @AuthUser() user: User,
    @Param() param: ProjectEditParam,
    @Body() body: ProjectEditBody
  ): Promise<ProjectEditRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    const config = {}
    if (body.ipset) {
      config['ipset'] = {
        id: body.ipset.id,
        name: body.ipset.name,
        region: body.ipset.region
      }
    }
    if (body.ipsetV6) {
      config['ipsetV6'] = {
        id: body.ipsetV6.id,
        name: body.ipsetV6.name,
        region: body.ipsetV6.region
      }
    }

    const project = (await this.prisma.project.update({
      where: { friendlyId: param.projectFriendlyId },
      data: {
        friendlyId: body.friendlyId,
        awsAccessKey: body.awsAccessKey,
        awsSecret: body.awsSecret,
        ipType: body.ipType,
        config: Object.keys(config).length === 0 ? undefined : config
      }
    })) as ProjectType

    return {
      project: mapProjectToRes(project)
    }
  }

  @HttpCode(200)
  @Get('/:projectFriendlyId')
  async view(@AuthUser() user: User, @Param() param: ProjectViewParam): Promise<ProjectViewRes> {
    const projUser = await this.authorization.assertUserBelongsProject(
      user,
      param.projectFriendlyId
    )

    const project = (await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType

    return {
      project: {
        id: project.id,
        friendlyId: project.friendlyId,
        ipType: project.ipType
      },
      isAdmin: projUser.isAdmin
    }
  }

  @HttpCode(200)
  @Post('/:projectFriendlyId/delete')
  async delete(
    @AuthUser() user: User,
    @Param() param: ProjectDeleteParam
  ): Promise<ProjectDeleteRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    await this.prisma.project.delete({
      where: { friendlyId: param.projectFriendlyId },
      include: {
        projectUsers: true,
        ipAddresses: true,
        webpages: true
      }
    })
    return {}
  }
}
