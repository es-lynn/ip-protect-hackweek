import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBasicAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth-guard'

export function UseAuthGuard(): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiBasicAuth('BasicToken'), UseGuards(AuthGuard))
}
