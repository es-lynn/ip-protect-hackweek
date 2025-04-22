import { Module } from '@nestjs/common'

import { PrismaModule } from '../../core/prisma/prisma.module'
import { WhitelistController } from './whitelist.controller'

@Module({
  imports: [PrismaModule],
  controllers: [WhitelistController]
})
export class WhitelistModule {}
