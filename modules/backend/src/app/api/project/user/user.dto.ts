import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

import { User } from '../_dto/dto'

export class UserListParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class UserListRes {
  users: User[]
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
  user: User
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
  user: User
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
