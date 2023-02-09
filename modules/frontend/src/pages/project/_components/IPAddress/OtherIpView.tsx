import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, IconButton, InfoIcon, Menu, Text, VStack } from 'native-base'
import React from 'react'

import { Modal } from '../../../../modal/ModalController'

interface Props {
  ip: string
  name: string
  synced: boolean
  onDeleteIpAddress: (ipAddress: string) => Promise<void>
}

// TODO: edit IP
// TODO: x days ago

export const OtherIpView = (props: Props) => {
  return (
    <VStack p={4} bg="muted.100" space={2}>
      <Text fontSize="md" fontWeight={400} color="text.900">
        {props.name}
      </Text>

      <HStack justifyContent="space-between">
        <Text fontSize="xs" color="muted.600">
          {props.ip}
        </Text>
        <Text fontSize="xs" color="muted.600">
          added 2 days ago
        </Text>
      </HStack>
      {!props.synced && (
        <HStack space="2" bg="muted.200" rounded="8" p="2">
          <InfoIcon flexShrink={0} mt={1} />
          <VStack flexShrink={1}>
            <Text color="muted.800" fontWeight={600}>
              IP address not found
            </Text>
            <Text color="muted.800">
              This IP address could not be found in the project’s main server. To whitelist this
              address again, delete and add it to the project.
            </Text>
          </VStack>
        </HStack>
      )}

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
              onConfirm: async () => await props.onDeleteIpAddress(props.ip)
            })
          }
        >
          Delete
        </Menu.Item>
      </Menu>
    </VStack>
  )
}
