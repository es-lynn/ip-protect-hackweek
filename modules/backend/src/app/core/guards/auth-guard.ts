import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

import { str } from '../../../commons/utils/StringUtil'
import { ConfigService } from '../config/config.service'
import { PrismaService } from '../prisma/prisma.service'
import { parseUid } from './auth-guard.util'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const session = req.session

    /** Basic */
    if (req.headers.authorization?.startsWith('Basic')) {
      const [, base64] = req.headers.authorization.split('Basic ')
      const [uid, password] = str.base64Decode(base64).split(':')
      const [provider, providerId] = parseUid(uid)
      if (password !== this.config.auth.basicPassword) {
        throw new UnauthorizedException('Incorrect password')
      }
      const user = await this.prisma.user.findUnique({
        where: {
          providerId_provider: { provider, providerId }
        }
      })
      if (!user) {
        throw new UnauthorizedException(`No such user exists: ${uid}`)
      }
      req.user = user
      /** Session */
    } else if (req.session?.user) {
      req.user = session.user
      /** Not logged in */
    } else {
      throw new UnauthorizedException('No current user found. Please log in.')
    }

    return true
  }
}
