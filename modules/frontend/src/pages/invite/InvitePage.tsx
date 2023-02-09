import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

import { LoginPageView } from '../auth/login/_components/LoginPageView'

export const InvitePage = ({ route }: any) => {
  const { loginWithRedirect } = useAuth0()

  // TODO: Needs a parse function
  const code = route.params.code

  return (
    <LoginPageView
      title="You were invited to join IProtect!"
      onPressLogin={() => {
        sessionStorage.setItem('inviteCode', code)
        loginWithRedirect({
          authorizationParams: {
            prompt: 'login'
          }
        })
      }}
    />
  )
}
