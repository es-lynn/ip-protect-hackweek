import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { ConfigService } from '../../../core/config/config.service'
import { AuthUser } from '../../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../../core/guards/decorators/UseAuthGuard'
import { PrismaService } from '../../../core/prisma/prisma.service'
import { InvitationCreateBody, InvitationCreateParam, InvitationCreateRes } from './invitation.dto'

@UseAuthGuard()
@ApiTags('/project/:projectFriendlyId/invitation')
@Controller('/project/:projectFriendlyId/invitation')
export class InvitationController {
  constructor(private db: PrismaService, private cfg: ConfigService) {}

  @HttpCode(200)
  @Post('/create')
  async create(
    @Param() param: InvitationCreateParam,
    @Body() body: InvitationCreateBody,
    @AuthUser() user: User
  ): Promise<InvitationCreateRes> {
    const project = await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    const projectUser = await this.db.projectUser.findUniqueOrThrow({
      where: { projectId_userId: { userId: user.id, projectId: project.id } }
    })
    const invitation = await this.db.invitation.create({
      data: {
        expiresAt: new Date(Date.now() + body.expiresIn * 1000),
        projectId: project.id,
        providerId: body.providerId,
        projectUserId: projectUser.id
      }
    })

    return {
      url: `${this.cfg.app.frontendDomain}/invite?code=${invitation.id}`
    }
  }
}
