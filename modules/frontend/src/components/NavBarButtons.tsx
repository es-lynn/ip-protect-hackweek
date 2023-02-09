import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Box, Image, Menu, Pressable, Text } from 'native-base'
import React, { useContext } from 'react'

import { AppContext } from '../App.context'
import { Cfg } from '../config/config'
import { Modal } from '../modal/ModalController'
import { format } from '../utils/format'
import { generateRandomNumber } from '../utils/random.util'
import { colors } from './Avatar'

// TODO get user initials
// TODO admin [...] button on projects screen
export const NavBarButtons = (): React.ReactNode => {
  const { logout } = useAuth0()
  const { me } = useContext(AppContext)

  return (
    <Box px={4}>
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
    </Box>
  )
}
