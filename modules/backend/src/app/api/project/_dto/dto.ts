import { ApiProperty } from '@nestjs/swagger'

export class IpAddress {
  @ApiProperty()
  id: string

  @ApiProperty()
  ip: string

  @ApiProperty()
  tag: string

  @ApiProperty()
  createdAt: Date
}

export class User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  provider: string

  @ApiProperty()
  providerId: string

  @ApiProperty()
  picture?: string
}
