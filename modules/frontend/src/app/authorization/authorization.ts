export class Authorization {
  private header!: string

  setBasic(username: string, password: string): void {
    this.header = `Basic ${btoa(`${username}:${password}`)}`
  }

  setBearer(jwt: string): void {
    this.header = `Bearer ${jwt}`
  }

  getHeader(): string {
    if (this.header == null) {
      throw Error('Authorization header is not set. Did you forget to call setBasic or setBearer?')
    }
    return this.header
  }
}
