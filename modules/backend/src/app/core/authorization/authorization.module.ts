import { Module } from '@nestjs/common'
import { User } from '@prisma/client'

import { PrismaModule } from '../../core/prisma/prisma.module'
import { AuthorizationService } from './authorization.service'

@Module({
  imports: [PrismaModule],
  providers: [AuthorizationService],
  exports: [AuthorizationService]
})
export class AuthorizationModule {}
