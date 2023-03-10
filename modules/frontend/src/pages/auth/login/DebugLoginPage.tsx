import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'

import { Modal } from '../../../modal/ModalController'
import { LoginDialog } from './_components/LoginDialog'

export const DebugLoginPage = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <SafeAreaView>
      <Button onPress={() => Modal.dialog(p => <LoginDialog {...p} />)}>Login</Button>
      <Button onPress={() => loginWithRedirect()}>Login (Auth0)</Button>
    </SafeAreaView>
  )
}
