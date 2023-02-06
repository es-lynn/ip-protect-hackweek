import { Button, FormControl, Input, Modal, Select } from 'native-base'
import React, { useState } from 'react'

import { AsyncButton } from '../../../../components/AsyncButton'
import { api } from '../../../../config/config'
import { useFormState } from '../../../../hooks/useFormState'
import { parseRole, Role } from '../../../../types/role'

type UserAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
  createInviteLink: (projectFriendlyId: string, duration: number, email: string) => Promise<string>
}

export const InvitationCreateDialog = ({
  modal,
  projectFriendlyId,
  createInviteLink
}: UserAddDialogProps<any>) => {
  const [form, setForm] = useFormState<{
    duration: number
    email: string
  }>({
    duration: 3600,
    email: ''
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>User</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={form.email}
              onChangeText={async text => {
                setForm('email', text)
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Expires</FormControl.Label>
            <Select
              minWidth="200"
              _selectedItem={{ bg: 'teal.600' }}
              mt="1"
              selectedValue={form.duration.toString()}
              onValueChange={value => {
                setForm('duration', Number.parseInt(value))
              }}
            >
              <Select.Item key={'1_hour'} label={'1 hour'} value={'3600'} />
              <Select.Item key={'1_day'} label={'1 day'} value={'86400'} />
              <Select.Item key={'1_week'} label={'1 week'} value={'604800'} />
            </Select>
          </FormControl>
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={() => modal.cancel()}>
            Cancel
          </Button>
          <AsyncButton
            onPress={async () => {
              const url = await createInviteLink(projectFriendlyId, form.duration, form.email)
              modal.ok(url)
            }}
          >
            Add
          </AsyncButton>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
