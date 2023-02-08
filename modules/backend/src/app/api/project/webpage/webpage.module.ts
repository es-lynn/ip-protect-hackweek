import { Module } from '@nestjs/common'

import { AuthorizationModule } from '../../../core/authorization/authorization.module'
import { PrismaModule } from '../../../core/prisma/prisma.module'
import { WebpageController } from './webpage.controller'

@Module({
  imports: [PrismaModule, AuthorizationModule],
  controllers: [WebpageController]
})
export class WebpageModule {}
