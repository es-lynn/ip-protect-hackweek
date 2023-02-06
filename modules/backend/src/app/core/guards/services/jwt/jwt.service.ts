import { Injectable } from '@nestjs/common'
import * as jose from 'jose'
import { FlattenedJWSInput, GetKeyFunction, JWSHeaderParameters } from 'jose/dist/types/types'

import { ConfigService } from '../../../config/config.service'
import { JwtPayloadAuth0, JwtUser } from './jwt.types'

@Injectable()
export class JwtService {
  private jwks: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>

  constructor(private config: ConfigService) {
    this.jwks = jose.createRemoteJWKSet(
      new URL(`${this.config.auth0.domain}/.well-known/jwks.json`)
    )
  }

  async verifyJwt(idToken: string): Promise<JwtUser> {
    const jwt = await jose.jwtVerify(idToken, this.jwks, {
      audience: this.config.auth0.clientId
    })
    // FIXME: This should probably be a parse function
    const payload = jwt.payload as JwtPayloadAuth0
    return {
      email: payload.email,
      email_verified: payload.email_verified,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub,
      provider: payload.sub.split('|')[0]
    }
  }
}
