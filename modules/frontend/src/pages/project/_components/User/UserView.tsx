import { Button, Menu, Pressable, ThreeDotsIcon } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Chip, Text } from 'react-native-paper'

import { ProjectUser } from '../../../../../lib/api/Api'
import { Modal } from '../../../../modal/ModalController'
import { sp } from '../../../../styles/space'
import { Role } from '../../../../types/role'
import { UserEditRoleDialog } from './UserEditRoleDialog'

export type UserViewProps = {
  users?: ProjectUser[]
  projectFriendlyId: string
  editProjectUserRole: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
}
export const UserView = ({ users, projectFriendlyId, editProjectUserRole }: UserViewProps) => {
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
                <Text>{user.name}</Text>
                {user.isAdmin && <Chip style={{ marginLeft: sp._8 }}>Admin</Chip>}
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
                  <Menu.Item onPress={() => {}}>Delete</Menu.Item>
                </Menu>
              </View>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <Button onPress={() => {}}>Add User</Button>
    </View>
  )
}
