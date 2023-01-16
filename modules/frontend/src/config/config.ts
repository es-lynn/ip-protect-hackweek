import { Api } from '../../lib/api/Api'

const api = new Api({
  baseUrl: 'http://192.168.50.96:4000',
  securityWorker: securityData => {
    return {
      headers: {
        Authorization: `Basic ${btoa(
          // eslint-disable-next-line no-secrets/no-secrets
          'b6862bc4-e1c6-42e5-86af-5044c9799157:password'
        )}`
      }
    }
  }
})

export { api }
