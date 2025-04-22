import { Ionicons } from '@expo/vector-icons'
import { Button, Heading, HStack, Icon, IconButton, Menu, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'

import { IpAddressWhitelistedRes } from '../../../../../lib/api/Api'
import { Modal } from '../../../../modal/ModalController'

interface Props {
  ip?: string | null
  isV6?: boolean
  name?: string
  isWhitelisted?: boolean
  onPressWhitelist: (ip: string) => void
  onDeleteIpAddress: (ipAddress: string) => Promise<void>
  whitelisted?: IpAddressWhitelistedRes
}

// TODO: edit/delete IP

export const CurrentIpView = (props: Props) => {
  const [byOtherUser, setByOtherUser] = useState<boolean>()
  const whitelisted = props.whitelisted

  useEffect(() => {
    if (whitelisted) setByOtherUser(whitelisted.isWhitelisted && !whitelisted.isMyIp)
  }, [whitelisted])

  return (
    <VStack p={4} space={2}>
      <HStack justifyContent="space-between">
        <Heading size="sm">
          IPv{props.isV6 ? '6' : '4'}
          {props.name && ': ' + props.name}
        </Heading>
      </HStack>
      <Text fontSize="xs" color="muted.600">
        {props.ip ?? 'N/A'}
      </Text>
      {props.ip && props.isWhitelisted !== undefined && (
        <HStack space={2} alignItems="center">
          {props.isWhitelisted ? (
            <Icon as={Ionicons} name="checkmark-circle" color="tertiary.600" size={5} />
          ) : (
            <Icon as={Ionicons} name="close-circle" color="red.700" size={5} />
          )}
          <Text>
            {props.isWhitelisted
              ? byOtherUser
                ? `Whitelisted by ${props.whitelisted?.user?.name ?? 'unknown'}`
                : 'Whitelisted'
              : 'Not whitelisted'}
          </Text>
        </HStack>
      )}
      {props.ip && !props.name && whitelisted?.user == null && (
        <Button onPress={() => props.onPressWhitelist(props.ip!)}>Whitelist this IP address</Button>
      )}

      {props.isWhitelisted && props.ip && (
        <Menu
          trigger={triggerProps => (
            <IconButton
              icon={<Icon as={Ionicons} name="ellipsis-vertical" color="muted.500" size={5} />}
              borderRadius="full"
              accessibilityLabel="More options menu"
              position="absolute"
              right={2}
              top={2}
              {...triggerProps}
            />
          )}
        >
          <Menu.Item
            onPress={() =>
              Modal.confirm2({
                title: 'Delete IP Address',
                body: `Are you sure you wish to delete ${props.name}?`,
                type: 'danger',
                onConfirm: async () => await props.onDeleteIpAddress(props.ip!)
              })
            }
          >
            Delete
          </Menu.Item>
        </Menu>
      )}
    </VStack>
  )
}
