import { ProjectUser, User } from '@prisma/client'

import { ProjectUser as ProjectUserDto } from './user.dto'

export function mapToUserDto(projUser: ProjectUser & { user: User }): ProjectUserDto {
  return {
    id: projUser.user.id,
    name: projUser.user.name,
    provider: projUser.user.provider,
    providerId: projUser.user.providerId,
    isAdmin: projUser.isAdmin
  }
}
