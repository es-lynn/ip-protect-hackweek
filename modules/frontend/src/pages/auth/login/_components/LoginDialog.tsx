import { Button, FormControl, Input, Modal } from 'native-base'
import React from 'react'

import { authorization, credentials } from '../../../../config/config'
import { useFormState } from '../../../../hooks/useFormState'
import { nav } from '../../../../router/nav'
import { route } from '../../../../router/route'

type ProjectAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
}

export const LoginDialog = ({ modal }: ProjectAddDialogProps<any>) => {
  const [credentialsForm, setCredentialsForm] = useFormState<{
    uid: string
    password: string
  }>({
    uid: '',
    password: ''
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>Login</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>uid</FormControl.Label>
          <Input
            placeholder={'email|evelyn_toh@outlook.com'}
            onChangeText={text => setCredentialsForm('uid', text)}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Password</FormControl.Label>
          <Input type={'password'} onChangeText={text => setCredentialsForm('password', text)} />
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={() => modal.cancel()}>
            Cancel
          </Button>
          <Button
            onPress={() => {
              authorization.setBasic(credentialsForm.uid, credentialsForm.password)
              nav.navigate(route.home.index)
              modal.ok()
            }}
          >
            Login
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
