import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class EnvSchema {
  /**
   * APP
   */
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  APP_DEV_MODE: boolean

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  APP_ENABLE_SWAGGER: boolean

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  APP_DOMAIN: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  APP_FRONTEND_DOMAIN: string

  /**
   * AUTH
   */
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_BASIC_PASSWORD: string

  /**
   * AUTH0
   */
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH0_DOMAIN: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH0_CLIENT_ID: string
}
