import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { MeModule } from './me/me.module'
import { InvitationModule } from './project/invitation/invitation.module'
import { IpAddressModule } from './project/ip-address/ip-address.module'
import { ProjectModule } from './project/project.module'
import { UserModule as ProjectUserModule } from './project/user/user.module'
import { WebpageModule } from './project/webpage/webpage.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    MeModule,
    ProjectModule,
    IpAddressModule,
    WebpageModule,
    AuthModule,
    UserModule,
    ProjectUserModule,
    InvitationModule
  ],
  controllers: []
})
export class ApiModule {}
