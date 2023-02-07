import { IsNotEmpty, IsString } from 'class-validator'

export class AuthRegisterBody {
  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  idToken: string
}

export class AuthRegisterRes {}
