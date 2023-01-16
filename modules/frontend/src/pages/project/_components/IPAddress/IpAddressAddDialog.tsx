import { Button, FormControl, Input, Modal } from 'native-base'
import React from 'react'

import { Webpage } from '../../../../../lib/api/Api'
import { AsyncButton } from '../../../../components/AsyncButton'
import { useFormState } from '../../../../hooks/useFormState'

type IpAddressAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
  addIpAddress: (
    projectFriendlyId: string,
    ipAddress: { ip: string; tag: string }
  ) => Promise<void>
}

export const IpAddressAddDialog = ({
  modal,
  projectFriendlyId,
  addIpAddress
}: IpAddressAddDialogProps<any>) => {
  const [form, setForm] = useFormState<{
    tag: string
    ipAddress: string
  }>({
    tag: '',
    ipAddress: ''
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>IP Address</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>Tag</FormControl.Label>
          <Input onChangeText={text => setForm('tag', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IP Address</FormControl.Label>
          <Input onChangeText={text => setForm('ipAddress', text)} />
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => modal.cancel()}
          >
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
