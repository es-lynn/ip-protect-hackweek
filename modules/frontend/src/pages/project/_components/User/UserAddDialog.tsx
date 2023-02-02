import { Button, FormControl, Input, Modal, Select } from 'native-base'
import React, { useState } from 'react'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

import { AsyncButton } from '../../../../components/AsyncButton'
import { api } from '../../../../config/config'
import { useFormState } from '../../../../hooks/useFormState'
import { parseRole, Role } from '../../../../types/role'

type UserAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
  addProjectUser: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
}

export const UserAddDialog = ({
  modal,
  projectFriendlyId,
  addProjectUser
}: UserAddDialogProps<any>) => {
  const [form, setForm] = useFormState<{
    userSearchQuery: string
    userId: string
    role: Role
  }>({
    userSearchQuery: '',
    userId: '',
    role: 'user'
  })

  const [userList, setUserList] = useState<{ id: string; title: string }[]>([])

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>User</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl>
            <FormControl.Label>Search</FormControl.Label>
            <Input
              value={form.userSearchQuery}
              onChangeText={async text => {
                setForm('userSearchQuery', text)
                const users = (await api.user.userList({ q: text })).data.users
                setUserList(
                  users.map(it => ({
                    title: `[${it.provider}] ${it.providerId} (${it.name})`,
                    id: it.id
                  }))
                )
                setForm('userId', users[0].id)
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>User</FormControl.Label>
            <Select
              minWidth="200"
              _selectedItem={{ bg: 'teal.600' }}
              mt="1"
              selectedValue={form.userId}
              onValueChange={value => {
                setForm('userId', value)
              }}
            >
              {userList.map(it => (
                <Select.Item key={it.id} label={it.title} value={it.id} />
              ))}
            </Select>
          </FormControl>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Role</FormControl.Label>
          <Select
            minWidth="200"
            _selectedItem={{ bg: 'teal.600' }}
            mt="1"
            defaultValue={form.role}
            onValueChange={value => setForm('role', parseRole(value))}
          >
            <Select.Item label="Admin" value="admin" />
            <Select.Item label="User" value="user" />
          </Select>
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={() => modal.cancel()}>
            Cancel
          </Button>
          <AsyncButton
            onPress={async () => {
              await addProjectUser(projectFriendlyId, form.userId, form.role)
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
