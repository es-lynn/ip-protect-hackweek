import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

export class Project3734 {
  id: string
  friendlyId: string
  ipset: IpSet
  awsAccessKey: string
  awsSecret: string
}

export class IpSet {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  region: string
}

export class ProjectCreateBody {
  @IsString()
  @IsNotEmpty()
  friendlyId: string

  @IsString()
  @IsNotEmpty()
  awsAccessKey: string

  @IsString()
  @IsNotEmpty()
  awsSecret: string

  @Type(() => IpSet)
  @ValidateNested()
  @ApiProperty({ type: IpSet })
  ipset: IpSet
}
export class ProjectCreateRes {
  project: Project3734
}

export class ProjectEditParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class ProjectEditBody {
  @IsString()
  @IsOptional()
  friendlyId?: string

  @IsString()
  @IsOptional()
  awsAccessKey?: string

  @IsString()
  @IsOptional()
  awsSecret?: string

  @IsOptional()
  @ApiProperty({ type: IpSet })
  ipset?: IpSet
}
export class ProjectEditRes {
  project: Project3734
}

export class ProjectViewParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class ProjectViewRes {
  project: Project3734
}

export class ProjectDeleteParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class ProjectDeleteRes {}
