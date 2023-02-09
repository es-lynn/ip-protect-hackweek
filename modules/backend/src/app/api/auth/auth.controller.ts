import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ConfigService } from '../../core/config/config.service'
import { JwtService } from '../../core/guards/services/jwt/jwt.service'
import { PrismaService } from '../../core/prisma/prisma.service'
import { AuthRegisterBody, AuthRegisterRes } from './auth.dto'

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
  private jwtService: JwtService
  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.jwtService = new JwtService(config)
  }

  // FIXME: Refactor this function into a service
  // FIXME: No honestly this code needs to be refactored
  @HttpCode(200)
  @Post('/register')
  async register(@Body() body: AuthRegisterBody): Promise<AuthRegisterRes> {
    const jwtUser = await this.jwtService.verifyJwt(body.idToken)
    const invitation = await this.prisma.invitation.findUniqueOrThrow({
      where: { id: body.code }
    })
    if (Date.now() >= new Date(invitation.expiresAt).getTime()) {
      throw new HttpException('Invitation expired', HttpStatus.BAD_REQUEST)
    }
    if (invitation.providerId && invitation.providerId !== jwtUser.email) {
      throw new HttpException(
        `Invitation is not valid for user: ${jwtUser.email}`,
        HttpStatus.BAD_REQUEST
      )
    }
    const user = await this.prisma.user.findUnique({
      where: {
        providerId_provider: {
          providerId: jwtUser.email,
          provider: jwtUser.provider
        }
      },
      include: {
        projectUsers: true
      }
    })
    if (!user) {
      await this.prisma.user.create({
        data: {
          provider: jwtUser.provider,
          providerId: jwtUser.email, // NOTE: This will not work for non google providers
          name: jwtUser.name,
          projectUsers: {
            create: {
              projectId: invitation.projectId,
              isAdmin: false
            }
          }
        }
      })
    } else if (!user.projectUsers.some(pu => pu.projectId === invitation.projectId)) {
      await this.prisma.projectUser.create({
        data: {
          projectId: invitation.projectId,
          userId: user.id,
          isAdmin: false
        }
      })
    }
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: invitation.projectId }
    })
    return {
      projectId: project.friendlyId
    }
  }
}
