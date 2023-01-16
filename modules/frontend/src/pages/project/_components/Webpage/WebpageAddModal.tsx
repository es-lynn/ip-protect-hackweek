import { Button, FormControl, Input, Modal } from 'native-base'
import React from 'react'

import { Webpage } from '../../../../../lib/api/Api'
import { AsyncButton } from '../../../../components/AsyncButton'
import { useFormState } from '../../../../hooks/useFormState'

type WebpageAddModalProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
  addWebpage: (
    projectFriendlyId: string,
    webpage: { url: string; name: string }
  ) => Promise<void>
}

export const WebpageAddModal = ({
  modal,
  projectFriendlyId,
  addWebpage
}: WebpageAddModalProps<any>) => {
  const [form, setForm] = useFormState<{
    name: string
    url: string
  }>({
    name: '',
    url: ''
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>Webpage</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input onChangeText={text => setForm('name', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>URL Address</FormControl.Label>
          <Input onChangeText={text => setForm('url', text)} />
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
              await addWebpage(projectFriendlyId, {
                url: form.url,
                name: form.name
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
