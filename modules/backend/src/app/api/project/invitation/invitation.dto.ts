import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator'

export class InvitationCreateParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class InvitationCreateBody {
  @IsNumber()
  @IsNotEmpty()
  @Max(604800) // 7 days in seconds
  expiresIn: number

  @IsString()
  providerId: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class InvitationCreateRes {
  url: string
}
