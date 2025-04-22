import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class WhitelistProjectQuery {
  @IsOptional()
  @IsString()
  ipv4?: string

  @IsOptional()
  @IsString()
  ipv6?: string
}

export class WhitelistProjectRes {
  isWhitelisted: boolean
}

export class WhitelistProjectParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}
