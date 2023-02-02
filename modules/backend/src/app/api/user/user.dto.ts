import { IsNotEmpty, IsString } from 'class-validator'

import { User } from '../project/_dto/dto'

export class UserSearchQuery {
  @IsString()
  @IsNotEmpty()
  q: string
}

export class UserSearchRes {
  users: User[]
}
