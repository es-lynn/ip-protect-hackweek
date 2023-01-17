import { Api } from '../../lib/api/Api'
import { throwToastError, Toast } from '../toast/Toast'

type Credentials = {
  uid?: string
  password?: string
}
const credentials: Credentials = {}

const api = new Api({
  baseUrl: 'http://192.168.50.96:4000',
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
