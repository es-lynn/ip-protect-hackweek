import { Module } from '@nestjs/common'

import { PrismaModule } from '../../core/prisma/prisma.module'
import { ProjectController } from './project.controller'
import { WebpageController } from './webpage/webpage.controller'

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController]
})
export class ProjectModule {}
