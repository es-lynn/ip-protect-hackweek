// NOTE: Only valid for `google-oauth2`. May not work for others
export type JwtPayloadAuth0 = {
  given_name: string
  family_name: string
  nickname: string
  name: string
  picture: string
  locale: string
  updated_at: string
  email: string
  email_verified: boolean
  iss: string
  aud: string
  iat: number
  exp: number
  sub: string
  sid: string
  nonce: string
}

export type JwtUser = {
  name: string
  picture?: string
  email: string
  email_verified: boolean
  sub: string
  provider: string
}
