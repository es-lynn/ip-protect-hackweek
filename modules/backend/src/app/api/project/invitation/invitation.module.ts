import { Module } from '@nestjs/common'

import { AuthorizationModule } from '../../../core/authorization/authorization.module'
import { PrismaModule } from '../../../core/prisma/prisma.module'
import { InvitationController } from './invitation.controller'

@Module({
  imports: [PrismaModule, AuthorizationModule],
  controllers: [InvitationController]
})
export class InvitationModule {}
