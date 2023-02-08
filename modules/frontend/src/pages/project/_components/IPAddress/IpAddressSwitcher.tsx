import { HStack, Pressable, Text } from 'native-base'
import React from 'react'

interface Props {
  selectedIpVersion: number
  onSelectIpVersion: (version: number) => void
}

export const IpAddressSwitcher: React.FC<Props> = (props: Props) => {
  return (
    <HStack space={1} p={1} rounded="md" bg="muted.200" mx={4} mt={2}>
      {[4, 6].map(i => (
        <Pressable
          flexGrow={1}
          flexBasis={0}
          onPress={() => props.onSelectIpVersion(i)}
          bg={i === props.selectedIpVersion ? 'muted.50' : ''}
          shadow={i === props.selectedIpVersion ? 1 : null}
          alignItems="center"
          p={1}
          _hover={{ bg: 'muted.100' }}
        >
          <Text fontWeight={400}>IPv{i}</Text>
        </Pressable>
      ))}
    </HStack>
  )
}
