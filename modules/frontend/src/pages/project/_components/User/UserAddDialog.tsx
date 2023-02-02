import { Button, FormControl, Input, Modal } from 'native-base'
import React from 'react'

import { AsyncButton } from '../../../../components/AsyncButton'
import { useFormState } from '../../../../hooks/useFormState'

type UserAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
}

export const UserAddDialog = ({ modal, projectFriendlyId }: UserAddDialogProps<any>) => {
  const [form, setForm] = useFormState<{
    userId: string
    role: string
  }>({
    userId: '',
    role: ''
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>User</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>User</FormControl.Label>
          <Input onChangeText={text => setForm('tag', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IP Address</FormControl.Label>
          <Input onChangeText={text => setForm('ipAddress', text)} />
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={() => modal.cancel()}>
            Cancel
          </Button>
          <AsyncButton
            onPress={async () => {
              await addIpAddress(projectFriendlyId, {
                ip: form.ipAddress,
                tag: form.tag
              })
              modal.ok()
            }}
          >
            Add
          </AsyncButton>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
