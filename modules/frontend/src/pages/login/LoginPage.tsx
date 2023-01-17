import { Button } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'

import { Modal } from '../../modal/ModalController'
import { LoginDialog } from './_components/LoginDialog'

export const LoginPage = () => {
  return (
    <SafeAreaView>
      <Button onPress={() => Modal.dialog(p => <LoginDialog {...p} />)}>Login</Button>
      <Button>Register</Button>
    </SafeAreaView>
  )
}
