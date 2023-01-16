import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { MeModule } from './me/me.module'
import { IpAddressModule } from './project/ip-address/ip-address.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './project/user/user.module'
import { WebpageModule } from './project/webpage/webpage.module'

@Module({
  imports: [
    MeModule,
    ProjectModule,
    IpAddressModule,
    WebpageModule,
    AuthModule,
    UserModule
  ],
  controllers: []
})
export class ApiModule {}
