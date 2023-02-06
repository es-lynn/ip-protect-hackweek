export type ConfigSchema = {
  app: {
    port: number
    dev_mode: boolean
    enable_swagger: boolean
    domain: string
    frontendDomain: string
  }
  swagger: {
    path: string
    title: string
    version: string
  }
  auth: {
    basicPassword: string
  }
}
