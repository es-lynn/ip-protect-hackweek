import { PrismaClient } from '@prisma/client'
import faker from 'faker'
;(async () => {
  const prisma = new PrismaClient()

  const user = await prisma.user.create({
    data: {
      id: 'b6862bc4-e1c6-42e5-86af-5044c9799157',
      name: 'Evelyn Toh',
      provider: 'email',
      providerId: 'evelyn_toh@outlook.com'
    }
  })

  const project1 = await prisma.project.create({
    data: {
      id: '3a6f97f5-b3a0-4935-a938-6614548a6a5e',
      friendlyId: 'xgw-ipv4',
      awsAccessKey: '',
      awsSecret: '',
      ipType: 'ipv4',
      config: {
        ipset: {
          name: 'developers',
          id: '7b65a72e-98ec-4550-b3a6-1b0d0c09dc99',
          region: 'ap-southeast-1'
        }
      },
      webpages: {
        createMany: {
          data: [
            {
              name: faker.internet.domainWord(),
              url: faker.internet.url()
            },
            {
              name: faker.internet.domainWord(),
              url: faker.internet.url()
            },
            {
              name: faker.internet.domainWord(),
              url: faker.internet.url()
            }
          ]
        }
      }
    }
  })

  const project2 = await prisma.project.create({
    data: {
      id: '969ad11b-8c7e-45bf-bc0f-18c65f028a7a',
      friendlyId: 'xgw-ipv6',
      awsAccessKey: '',
      awsSecret: '',
      ipType: 'ipv6',
      config: {
        v6ipset: {
          name: 'developers-ipv6',
          id: '94ed4fd3-617f-4b5a-a291-812ed12ffd93',
          region: 'ap-southeast-1'
        }
      },
      webpages: {
        createMany: {
          data: [
            {
              name: faker.internet.domainWord(),
              url: faker.internet.url()
            }
          ]
        }
      }
    }
  })

  await prisma.projectUser.create({
    data: {
      projectId: project1.id,
      userId: user.id,
      isAdmin: true,
      ipAddresses: {
        createMany: {
          data: [
            {
              ipAddress: '192.168.1.1',
              tag: 'Home',
              projectId: project1.id
            },
            {
              ipAddress: '172.23.9.4',
              tag: 'Office',
              projectId: project1.id
            }
          ]
        }
      }
    }
  })

  await prisma.projectUser.create({
    data: {
      projectId: project2.id,
      userId: user.id,
      isAdmin: true,
      ipAddresses: {
        createMany: {
          data: [
            {
              ipAddress: '172.23.9.4',
              tag: 'Office',
              projectId: project2.id
            }
          ]
        }
      }
    }
  })
})()
