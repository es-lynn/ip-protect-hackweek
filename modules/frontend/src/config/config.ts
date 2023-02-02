import Constants from 'expo-constants'

import { Api } from '../../lib/api/Api'
import { throwToastError } from '../toast/Toast'

const env: any = Constants.expoConfig?.extra?.env ?? {}

export const Cfg = {
  API_URL: env.API_URL,
  BASIC_AUTH_UID: env.BASIC_AUTH_UID,
  BASIC_AUTH_PASSWORD: env.BASIC_AUTH_PASSWORD
}

type Credentials = {
  uid?: string
  password?: string
}
const credentials: Credentials = {
  uid: Cfg.BASIC_AUTH_UID,
  password: Cfg.BASIC_AUTH_PASSWORD
}

const api = new Api({
  baseUrl: Cfg.API_URL,
  securityWorker: securityData => {
    if (!credentials.uid || !credentials.password) {
      throwToastError(new Error('Unauthorized. Please login'))
    }
    return {
      headers: {
        Authorization: `Basic ${btoa(
          // eslint-disable-next-line no-secrets/no-secrets
          // 'b6862bc4-e1c6-42e5-86af-5044c9799157:password'
          `${credentials.uid}:${credentials.password}`
        )}`
      }
    }
  }
})

export { api, credentials }
