import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UseAuthGuard } from '../../core/guards/decorators/UseAuthGuard'
import { PrismaService } from '../../core/prisma/prisma.service'
import { UserSearchQuery, UserSearchRes } from './user.dto'

@UseAuthGuard()
@ApiTags('/user')
@Controller('/user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @HttpCode(200)
  @Get('/search')
  async search(@Query() query: UserSearchQuery): Promise<UserSearchRes> {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query.q, mode: 'insensitive' } },
          { providerId: { contains: query.q, mode: 'insensitive' } }
        ]
      }
    })

    return {
      users: users.map(it => ({
        id: it.id,
        name: it.name,
        provider: it.provider,
        providerId: it.providerId
      }))
    }
  }
}
