import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsOptional, IsString } from 'class-validator'

import { IpType, IpTypeArr } from '../../core/types/types'
import { User } from '../project/_dto/dto'

/*
 {
 }
 {
  ipAddress: {
    ipv4: '
    ipv6: '
  },
  projects: []
 }
 */
export class MeRes {
  @ApiProperty({ type: User })
  user: User
}

export class MeIpAddressRes {
  @IsString()
  ipv4: string

  @IsString()
  @IsOptional()
  ipv6?: string
}

class Project {
  id: string
  friendlyId: string

  @IsIn(IpTypeArr)
  ipType: IpType
}
export class MeProjectListRes {
  @ApiProperty({ type: Project, isArray: true })
  projects: Project[]
}

export class ProjectDetailsParams {
  @IsString()
  friendlyId: string
}

class IpAddress {
  id: string
  ipAddress: string
  tag: string
}

class Webpage {
  id: string
  name: string
  url: string
}
export type ProjectDetailsRes = {
  project: {
    id: string
    friendlyId: string
    me: {
      isAdmin: boolean
      ipAddresses: IpAddress[]
    }
    webpages: Webpage[]
    users: {
      id: string
      providerId: string
      provider: string
      isAdmin: boolean
      ipAddresses?: IpAddress[]
    }[]
  }
}
