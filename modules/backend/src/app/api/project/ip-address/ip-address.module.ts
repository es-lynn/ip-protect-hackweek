import { Module } from '@nestjs/common'

import { AuthorizationModule } from '../../../core/authorization/authorization.module'
import { ModelModule } from '../../../core/model/model.module'
import { PrismaModule } from '../../../core/prisma/prisma.module'
import { IpAddressController } from './ip-address.controller'

@Module({
  imports: [PrismaModule, ModelModule, AuthorizationModule],
  controllers: [IpAddressController]
})
export class IpAddressModule {}
