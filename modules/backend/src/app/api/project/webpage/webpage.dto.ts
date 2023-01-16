import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

class Webpage {
  id: string
  name: string
  url: string
}

export class WebpageListParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class WebpageListRes {
  webpages: Webpage[]
}

export class WebpageAddParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class WebpageAddBody {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  url: string
}

export class WebpageAddRes {
  webpage: Webpage
}

export class WebpageEditParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  webpageId: string
}

export class WebpageEditBody {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  url?: string
}

export class WebpageEditRes {
  webpage: Webpage
}

export class WebpageDeleteParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  webpageId: string
}

export class WebpageDeleteRes {}
