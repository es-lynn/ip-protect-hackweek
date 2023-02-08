import { Project } from '@prisma/client'

export type ProjectType = Project & {
  config: {
    ipset: {
      id: string
      name: string
      region: string
    }
    ipsetV6: {
      id: string
      name: string
      region: string
    }
  }
}
