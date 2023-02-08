import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { AuthorizationService } from '../../../core/authorization/authorization.service'
import { AuthUser } from '../../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../../core/guards/decorators/UseAuthGuard'
import { PrismaService } from '../../../core/prisma/prisma.service'
import {
  UserAddBody,
  UserAddParam,
  UserAddRes,
  UserEditRoleBody,
  UserEditRoleParam,
  UserEditRoleRes,
  UserListParam,
  UserListRes,
  UserRemoveParam,
  UserRemoveRes
} from './user.dto'
import { mapToUserDto } from './user.util'

@UseAuthGuard()
@ApiTags('/project/:projectFriendlyId/user')
@Controller('/project/:projectFriendlyId/user')
export class UserController {
  constructor(private prisma: PrismaService, private authorization: AuthorizationService) {}

  @HttpCode(200)
  @Get('/list')
  async list(@AuthUser() user: User, @Param() param: UserListParam): Promise<UserListRes> {
    await this.authorization.assertUserBelongsProject(user, param.projectFriendlyId)

    const { projectUsers } = await this.prisma.project.findUniqueOrThrow({
      where: {
        friendlyId: param.projectFriendlyId
      },
      include: {
        projectUsers: {
          include: { user: true }
        }
      }
    })

    return {
      users: projectUsers.map(mapToUserDto)
    }
  }

  @HttpCode(201)
  @Post('/add')
  async add(
    @AuthUser() user: User,
    @Param() param: UserAddParam,
    @Body() body: UserAddBody
  ): Promise<UserAddRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    const projUser = await this.prisma.projectUser.create({
      data: {
        userId: body.id,
        isAdmin: body.isAdmin,
        projectId: project.id
      },
      include: { user: true }
    })

    return { user: mapToUserDto(projUser) }
  }

  @HttpCode(200)
  @Post(':userId/role/edit')
  async roleEdit(
    @AuthUser() user: User,
    @Param() param: UserEditRoleParam,
    @Body() body: UserEditRoleBody
  ): Promise<UserEditRoleRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    const projUser = await this.prisma.projectUser.update({
      where: {
        projectId_userId: {
          userId: param.userId,
          projectId: project.id
        }
      },
      include: { user: true },
      data: { isAdmin: body.isAdmin }
    })

    return { user: mapToUserDto(projUser) }
  }

  @HttpCode(200)
  @Post('/:userId/remove')
  async remove(@AuthUser() user: User, @Param() param: UserRemoveParam): Promise<UserRemoveRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    await this.prisma.projectUser.delete({
      where: {
        projectId_userId: {
          userId: param.userId,
          projectId: project.id
        }
      }
    })

    return {}
  }
}
