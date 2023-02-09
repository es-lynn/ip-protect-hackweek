import { useAuth0 } from '@auth0/auth0-react'
import { Ionicons } from '@expo/vector-icons'
import { Avatar, HStack, Icon, IconButton, Menu, Pressable, Text } from 'native-base'
import React, { useContext } from 'react'

import { AppContext } from '../App.context'
import { Cfg } from '../config/config'
import { Modal } from '../modal/ModalController'
import { format } from '../utils/format'
import { generateRandomNumber } from '../utils/random.util'
import { colors } from './Avatar'

interface Props {
  isAdmin: boolean
  onPressDelete: () => void
  onPressEdit?: () => void
}

export const NavBarButtons = (props?: Props) => (): React.ReactNode => {
  const { logout } = useAuth0()
  const { me } = useContext(AppContext)

  return (
    <HStack px={4} alignItems="center" space={2}>
      {props?.isAdmin && (
        <Menu
          trigger={triggerProps => (
            <IconButton
              icon={<Icon as={Ionicons} name="ellipsis-vertical" color="white" size={5} />}
              borderRadius="full"
              accessibilityLabel="Manage project options"
              {...triggerProps}
            />
          )}
        >
          {props?.onPressEdit && <Menu.Item onPress={() => props?.onPressEdit?.()}>Edit</Menu.Item>}
          <Menu.Item
            onPress={() =>
              Modal.confirm2({
                title: 'Delete project',
                type: 'danger',
                body: `Are you sure you want to delete the project?`,
                onConfirm: () => props?.onPressDelete(),
                confirmText: 'Delete'
              })
            }
          >
            Delete
          </Menu.Item>
        </Menu>
      )}

      <Menu
        trigger={triggerProps => (
          <Pressable {...triggerProps}>
            <Avatar size="sm" bg={colors[generateRandomNumber(me?.name ?? '') % colors.length]}>
              {me?.name ? format.initials(me.name) : ''}
            </Avatar>
          </Pressable>
        )}
      >
        {me && (
          <Menu.Item isDisabled={true}>
            <Text style={{ color: '#555555' }}>{me?.providerId}</Text>
          </Menu.Item>
        )}
        <Menu.Item
          onPress={() =>
            Modal.confirm2({
              title: 'Logout',
              type: 'danger',
              body: 'Are you sure you wish to logout?',
              onConfirm: () => {
                sessionStorage.removeItem('jwt') // FIXME Should be in auth service
                logout({ logoutParams: { returnTo: Cfg.APP_DOMAIN } })
              },
              confirmText: 'Logout'
            })
          }
        >
          Log out
        </Menu.Item>
      </Menu>
    </HStack>
  )
}
