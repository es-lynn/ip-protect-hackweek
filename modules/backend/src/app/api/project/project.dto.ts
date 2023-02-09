import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

import { IpType, IpTypeArr } from '../../core/types/types'

export class Project3734 {
  id: string
  friendlyId: string
  ipset: IpSet
  ipsetV6: IpSet
  awsAccessKey: string
  awsSecret: string

  @IsIn(IpTypeArr)
  ipType: string
}

export class Project5239 {
  id: string
  friendlyId: string
  @IsIn(IpTypeArr)
  ipType: string
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

  @IsIn(IpTypeArr)
  @IsString()
  @IsNotEmpty()
  ipType: IpType

  @Type(() => IpSet)
  @ValidateNested()
  @ApiProperty({ type: IpSet })
  ipset: IpSet

  @Type(() => IpSet)
  @ValidateNested()
  @ApiProperty({ type: IpSet })
  ipsetV6: IpSet
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

  @IsOptional()
  @ApiProperty({ type: IpSet })
  ipsetV6?: IpSet

  @IsIn(IpTypeArr)
  @IsString()
  @IsNotEmpty()
  ipType: IpType
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
  project: Project5239
  isAdmin: boolean
}

export class ProjectDeleteParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class ProjectDeleteRes {}
