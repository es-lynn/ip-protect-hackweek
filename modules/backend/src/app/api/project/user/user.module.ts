import { Module } from '@nestjs/common'

import { AuthorizationModule } from '../../../core/authorization/authorization.module'
import { PrismaModule } from '../../../core/prisma/prisma.module'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaModule, AuthorizationModule],
  controllers: [UserController]
})
export class UserModule {}
