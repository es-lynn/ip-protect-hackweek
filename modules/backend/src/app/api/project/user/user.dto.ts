import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class ProjectUser {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  provider: string

  @ApiProperty()
  providerId: string

  @ApiProperty()
  isAdmin: boolean
}

export class UserListParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class UserListRes {
  users: ProjectUser[]
}

export class UserAddParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class UserAddBody {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean
}

export class UserAddRes {
  user: ProjectUser
}

export class UserEditRoleParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class UserEditRoleBody {
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean
}

export class UserEditRoleRes {
  user: ProjectUser
}

export class UserRemoveParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class UserRemoveRes {}
