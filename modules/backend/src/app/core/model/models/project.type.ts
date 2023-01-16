import { Project } from '@prisma/client'

export type ProjectType = Project & {
  config: {
    awsAccessKeyId: string
    awsSecretAccessKey: string
    ipset: {
      id: string
      name: string
      region: string
    }
  }
}
