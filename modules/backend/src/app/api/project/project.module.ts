import { Module } from '@nestjs/common'

import { PrismaModule } from '../../core/prisma/prisma.module'
import { ProjectController } from './project.controller'

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController]
})
export class ProjectModule {}
