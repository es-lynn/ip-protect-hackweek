import { Ionicons } from '@expo/vector-icons'
import {
  ChevronRightIcon,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  Pressable,
  Text,
  VStack
} from 'native-base'
import React from 'react'

import { Webpage } from '../../../../../lib/api/Api'

interface Props {
  webpage: Webpage
  canEdit: boolean
  onPressDelete: (id: string) => Promise<void>
}

// TODO edit

export const WebpageRowView = (props: Props) => {
  return (
    <Pressable
      p={4}
      bg="muted.100"
      w="100%"
      _hover={{ bg: 'muted.200' }}
      _pressed={{ bg: 'muted.300' }}
    >
      <Link href={props.webpage.url} isExternal>
        <VStack space={2}>
          <Text fontSize="md" fontWeight={400} color="text.900">
            {props.webpage.name}
          </Text>

          <HStack justifyContent="space-between">
            <Text fontSize="xs" color="muted.600" underline>
              {props.webpage.url}
            </Text>
          </HStack>
        </VStack>
      </Link>

      {props.canEdit ? (
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
          <Menu.Item onPress={() => props.onPressDelete(props.webpage.id)}>Delete</Menu.Item>
        </Menu>
      ) : (
        <ChevronRightIcon color="muted.500" size={5} position="absolute" right={4} top={5} />
      )}
    </Pressable>
  )
}
