import { ForbiddenException, Injectable } from '@nestjs/common'
import { ProjectUser, User } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthorizationService {
  constructor(private db: PrismaService) {}

  async assertUserBelongsProject(user: User, projectFriendlyId: string): Promise<ProjectUser> {
    const projectUser = await this.db.projectUser.findUnique({
      where: {
        projectId_userId: {
          projectId: (
            await this.db.project.findUniqueOrThrow({
              where: { friendlyId: projectFriendlyId }
            })
          ).id,
          userId: user.id
        }
      }
    })
    if (!projectUser) {
      throw new ForbiddenException(
        `User '${user.provider}|${user.providerId}' does not belong to project '${projectFriendlyId}'`
      )
    }
    return projectUser
  }

  async assertUserIsProjectAdmin(user: User, projectId: string): Promise<ProjectUser> {
    const projectUser = await this.assertUserBelongsProject(user, projectId)
    if (!projectUser.isAdmin) {
      throw new ForbiddenException(
        `User '${user.provider}|${user.providerId}' is not admin of project '${projectId}'`
      )
    }
    return projectUser
  }
}
