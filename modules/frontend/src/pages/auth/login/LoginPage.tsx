import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

import { LoginPageView } from './_components/LoginPageView'

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0()

  return <LoginPageView title="Welcome!" onPressLogin={() => loginWithRedirect()} />
}
