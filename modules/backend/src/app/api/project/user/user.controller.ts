import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

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
  constructor(private prisma: PrismaService) {}

  @HttpCode(200)
  @Get('/list')
  async list(@Param() param: UserListParam): Promise<UserListRes> {
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
  async add(@Param() param: UserAddParam, @Body() body: UserAddBody): Promise<UserAddRes> {
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
    @Param() param: UserEditRoleParam,
    @Body() body: UserEditRoleBody
  ): Promise<UserEditRoleRes> {
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
  async remove(@Param() param: UserRemoveParam): Promise<UserRemoveRes> {
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
