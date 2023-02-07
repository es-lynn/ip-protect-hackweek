import { Module } from '@nestjs/common'

import { PrismaModule } from '../../../core/prisma/prisma.module'
import { InvitationController } from './invitation.controller'

@Module({
  imports: [PrismaModule],
  controllers: [InvitationController]
})
export class InvitationModule {}
