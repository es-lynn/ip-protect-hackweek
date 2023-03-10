import { AddIcon, Button, Center, Heading, Spinner, useBreakpointValue, VStack } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

import { ProjectUser } from '../../../../../lib/api/Api'
import { AsyncButton } from '../../../../components/AsyncButton'
import { ListDivider } from '../../../../components/ListDivider'
import { Modal } from '../../../../modal/ModalController'
import { Role } from '../../../../types/role'
import { InvitationCreateDialog } from './InvitationCreateDialog'
import { UserAddDialog } from './UserAddDialog'
import { UserEditRoleDialog } from './UserEditRoleDialog'
import { UserRowView } from './UserRowView'

export type UserViewProps = {
  users?: ProjectUser[]
  projectFriendlyId: string
  editProjectUserRole: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
  addProjectUser: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
  removeProjectUser: (projectFriendlyId: string, userId: string) => Promise<void>
  createInviteLink: (projectFriendlyId: string, duration: number, email: string) => Promise<string>
  isAdmin: boolean
}
export const UserView = ({
  users,
  projectFriendlyId,
  editProjectUserRole,
  addProjectUser,
  removeProjectUser,
  createInviteLink,
  isAdmin
}: UserViewProps) => {
  const topPadding = useBreakpointValue({ base: 0, sm: 5 })
  const rounding = useBreakpointValue({ base: 0, sm: 8 })

  return (
    <VStack mt={topPadding}>
      {users ? (
        <FlatList<ProjectUser>
          style={{ borderRadius: rounding }}
          data={users}
          ItemSeparatorComponent={() => <ListDivider />}
          ListEmptyComponent={() => (
            <Center mx={4} my={6}>
              <Text>There are no users in this project</Text>
            </Center>
          )}
          renderItem={({ item: user }) => (
            <UserRowView
              id={user.id}
              name={user.name}
              provider={user.provider}
              providerId={user.providerId}
              isAdmin={user.isAdmin}
              canEdit={isAdmin}
              onPressEditRole={() => {
                Modal.dialog(props => (
                  <UserEditRoleDialog
                    editProjectUserRole={editProjectUserRole}
                    projectFriendlyId={projectFriendlyId}
                    projectUser={user}
                    {...props}
                  />
                ))
              }}
              onPressDelete={() =>
                Modal.confirm2({
                  type: 'danger',
                  title: 'Remove User',
                  body: `Are you sure you wish to remove ${user.name} from this project?`,
                  onConfirm: async () => await removeProjectUser(projectFriendlyId, user.id)
                })
              }
            />
          )}
        />
      ) : (
        <Spinner />
      )}

      {isAdmin && [
        <Button
          m={6}
          leftIcon={<AddIcon />}
          alignSelf="start"
          variant="outline"
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
          Add existing user
        </Button>,

        <VStack p={6} space={1} bg="lightBlue.100" borderTopColor="info.300" borderTopWidth="2">
          <Heading size="xs">Need to give temporary access?</Heading>
          <Text>
            Send an invitation link to allow anyone or a specific email address to access your
            project temporarily.
          </Text>
          <AsyncButton
            mt={3}
            alignSelf="start"
            variant="outline"
            bg="white"
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
            Create invitation link
          </AsyncButton>
        </VStack>
      ]}
    </VStack>
  )
}
