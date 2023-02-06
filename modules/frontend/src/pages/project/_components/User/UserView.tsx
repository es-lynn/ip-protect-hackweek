import { Button, Menu, Pressable, ThreeDotsIcon } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Chip, Text } from 'react-native-paper'

import { ProjectUser } from '../../../../../lib/api/Api'
import { AsyncButton } from '../../../../components/AsyncButton'
import { Modal } from '../../../../modal/ModalController'
import { sp } from '../../../../styles/space'
import { Role } from '../../../../types/role'
import { InvitationCreateDialog } from './InvitationCreateDialog'
import { UserAddDialog } from './UserAddDialog'
import { UserEditRoleDialog } from './UserEditRoleDialog'

export type UserViewProps = {
  users?: ProjectUser[]
  projectFriendlyId: string
  editProjectUserRole: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
  addProjectUser: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
  removeProjectUser: (projectFriendlyId: string, userId: string) => Promise<void>
  createInviteLink: (projectFriendlyId: string, duration: number, email: string) => Promise<string>
}
export const UserView = ({
  users,
  projectFriendlyId,
  editProjectUserRole,
  addProjectUser,
  removeProjectUser,
  createInviteLink
}: UserViewProps) => {
  return (
    <View>
      {users ? (
        <FlatList<ProjectUser>
          data={users}
          renderItem={({ item: user }) => (
            <View
              key={user.id}
              style={{
                padding: sp._8,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <View style={{ flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <Text>{user.name}</Text>
                  {user.isAdmin && <Chip style={{ marginLeft: sp._8 }}>Admin</Chip>}
                </View>
                <Text>
                  [{user.provider}] {user.providerId}
                </Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <Menu
                  trigger={triggerProps => (
                    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <ThreeDotsIcon />
                    </Pressable>
                  )}
                >
                  <Menu.Item
                    onPress={() => {
                      Modal.dialog(props => (
                        <UserEditRoleDialog
                          editProjectUserRole={editProjectUserRole}
                          projectFriendlyId={projectFriendlyId}
                          projectUser={user}
                          {...props}
                        />
                      ))
                    }}
                  >
                    Edit Role
                  </Menu.Item>
                  <Menu.Item
                    onPress={() =>
                      Modal.confirm2({
                        type: 'danger',
                        title: 'Remove User',
                        body: `Are you sure you wish to remove ${user.name} from this project?`,
                        onConfirm: async () => await removeProjectUser(projectFriendlyId, user.id)
                      })
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              </View>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <Button
        onPress={() =>
          Modal.dialog(props => (
            <UserAddDialog
              projectFriendlyId={projectFriendlyId}
              addProjectUser={addProjectUser}
              {...props}
            />
          ))
        }
      >
        Add User
      </Button>
      <AsyncButton
        onPress={async () => {
          const url = await Modal.dialog<string>(props => (
            <InvitationCreateDialog
              projectFriendlyId={projectFriendlyId}
              createInviteLink={createInviteLink}
              {...props}
            />
          ))
          prompt('Invitation link', url)
        }}
      >
        Create Invite Link
      </AsyncButton>
    </View>
  )
}
