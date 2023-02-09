import {
  Avatar,
  Badge,
  Box,
  HStack,
  Icon,
  IconButton,
  InfoIcon,
  Menu,
  Pressable,
  Text,
  VStack
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Modal } from '../../../../modal/ModalController'
import React from 'react'

interface Props {
  id: string
  name: string
  provider: string
  providerId: string
  isAdmin: boolean
  canEdit: boolean
  onPressEditRole: (id: string) => void
  onPressDelete: (id: string) => void
}

export const UserRowView = (props: Props) => {
  return (
    <Box>
      <VStack p={4} bg="muted.100" space={2}>
        <HStack space={2} alignItems="center" justifyContent="start">
          <Avatar size="sm" bg="emerald.600">
            AA
          </Avatar>
          <Text fontSize="md" fontWeight={400} color="text.900">
            {props.name}
          </Text>
          {props.isAdmin && (
            <Badge variant="solid" rounded={4} bg="muted.500">
              Admin
            </Badge>
          )}
        </HStack>
        <Text fontSize="xs" color="muted.600">
          [{props.provider}] {props.providerId}
        </Text>
      </VStack>

      {props.canEdit && (
        <Menu
          trigger={triggerProps => (
            <IconButton
              icon={<Icon as={Ionicons} name="ellipsis-vertical" color="muted.500" size={5} />}
              borderRadius="full"
              accessibilityLabel="More options menu"
              position="absolute"
              right={4}
              top={4}
              {...triggerProps}
            />
          )}
        >
          <Menu.Item onPress={() => props.onPressEditRole(props.id)}>Edit role</Menu.Item>
          <Menu.Item onPress={() => props.onPressDelete(props.id)}>Delete</Menu.Item>
        </Menu>
      )}
    </Box>
  )
}
