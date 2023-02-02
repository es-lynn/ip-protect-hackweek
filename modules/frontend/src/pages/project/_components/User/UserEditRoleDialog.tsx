import { Button, FormControl, Modal, Select } from 'native-base'
import React from 'react'

import { ProjectUser } from '../../../../../lib/api/Api'
import { AsyncButton } from '../../../../components/AsyncButton'
import { useFormState } from '../../../../hooks/useFormState'
import { parseRole, Role, toRole } from '../../../../types/role'

type UserAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
  projectUser: ProjectUser
  editProjectUserRole: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
}

export const UserEditRoleDialog = ({
  modal,
  projectFriendlyId,
  projectUser,
  editProjectUserRole
}: UserAddDialogProps<any>) => {
  const [form, setForm] = useFormState<{
    role: Role
  }>({
    role: toRole(projectUser.isAdmin)
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>User</Modal.Header>
      <Modal.Body>
        <FormControl w="3/4" maxW="300" isRequired>
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
              await editProjectUserRole(projectFriendlyId, projectUser.id, form.role)
              modal.ok()
            }}
          >
            Save
          </AsyncButton>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
