import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Box, Menu, Pressable } from 'native-base'
import React from 'react'

import { Cfg } from '../config/config'
import { Modal } from '../modal/ModalController'

// TODO get user initials
// TODO admin [...] button on projects screen
export const NavBarButtons = (): React.ReactNode => {
  const { logout } = useAuth0()

  return (
    <Box px={4}>
      <Menu
        trigger={triggerProps => (
          <Pressable {...triggerProps}>
            <Avatar size="sm" bg="cyan.600">
              AA
            </Avatar>
          </Pressable>
        )}
      >
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
    </Box>
  )
}
