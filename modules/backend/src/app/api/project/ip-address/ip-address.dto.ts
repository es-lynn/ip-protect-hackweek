import { IsNotEmpty, IsString } from 'class-validator'

import { IpAddress, User } from '../_dto/dto'

class ListResIpAddress extends IpAddress {
  synced: boolean
}

export class IpAddressListParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class IpAddressListRes {
  ipAddresses: ListResIpAddress[]
}

export class IpAddressAddParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class IpAddressAddBody {
  @IsString()
  @IsNotEmpty()
  ip: string

  @IsString()
  @IsNotEmpty()
  tag: string
}

export class IpAddressAddRes {
  ipAddress: IpAddress
}

export class IpAddressEditParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  ipAddressId: string
}

export class IpAddressEditBody {
  @IsString()
  @IsNotEmpty()
  ip: string

  @IsString()
  @IsNotEmpty()
  tag: string
}

export class IpAddressEditRes {
  ipAddress: IpAddress
}

export class IpAddressRemoveParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class IpAddressRemoveBody {
  @IsString()
  @IsNotEmpty()
  ipAddress: string
}

export class IpAddressRemoveRes {}

export class IpAddressSyncParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  ipAddressId: string
}

export class IpAddressSyncRes {}

export class IpAddressWhitelistedParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class IpAddressWhitelistedQuery {
  @IsString()
  @IsNotEmpty()
  ipAddress: string
}

export class IpAddressWhitelistedRes {
  isWhitelisted: boolean
  isMyIp?: boolean
  ipAddress?: IpAddress
  user?: User
}
