import { Module } from '@nestjs/common'

import { AuthorizationModule } from '../../core/authorization/authorization.module'
import { PrismaModule } from '../../core/prisma/prisma.module'
import { ProjectController } from './project.controller'

@Module({
  imports: [PrismaModule, AuthorizationModule],
  controllers: [ProjectController]
})
export class ProjectModule {}
