import Constants from 'expo-constants'

import { Api } from '../../lib/api/Api'
import { Authorization } from '../app/authorization/authorization'
import { throwToastError } from '../toast/Toast'

const env: any = Constants.expoConfig?.extra?.env ?? {}

export const Cfg = {
  APP_DOMAIN: env.APP_DOMAIN,
  API_URL: env.API_URL,
  BASIC_AUTH_UID: env.BASIC_AUTH_UID,
  BASIC_AUTH_PASSWORD: env.BASIC_AUTH_PASSWORD,
  auth0: {
    domain: env.AUTH0_DOMAIN,
    clientId: env.AUTH0_CLIENT_ID,
    redirectUri: `${env.APP_DOMAIN}${env.AUTH0_REDIRECT_PATH}`
  }
}

type Credentials = {
  uid?: string
  password?: string
}
const credentials: Credentials = {
  uid: Cfg.BASIC_AUTH_UID,
  password: Cfg.BASIC_AUTH_PASSWORD
}

const authorization = new Authorization()
if (credentials.uid && credentials.password) {
  authorization.setBasic(credentials.uid, credentials.password)
}

const api = new Api({
  baseUrl: Cfg.API_URL,
  securityWorker: securityData => {
    return { headers: { Authorization: authorization.getHeader() } }
  }
})

export { api, credentials, authorization }
