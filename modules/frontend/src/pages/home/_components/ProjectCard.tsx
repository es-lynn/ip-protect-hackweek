import {
  ChevronRightIcon,
  CircleIcon,
  Heading,
  HStack,
  InfoIcon,
  Pressable,
  Spinner,
  Text,
  VStack
} from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'

type AccessType = {
  [key in 'full' | 'partial' | 'none']: { text: string; color: ColorType }
}

const AccessTypes: AccessType = {
  full: { text: 'Full access', color: 'tertiary.600' },
  partial: { text: 'May not have access', color: 'warning.400' },
  none: { text: 'No access', color: 'error.700' }
}

interface Props {
  name: string
  access?: keyof AccessType
  onPress?: () => void
}

export const ProjectCard = (props: Props): JSX.Element => {
  return (
    <Pressable
      rounded="lg"
      shadow="2"
      p="4"
      backgroundColor="white"
      my="2"
      _hover={{ bg: 'muted.50', shadow: '3' }}
      _pressed={{ bg: 'muted.50', shadow: '4' }}
      onPress={props.onPress}
    >
      <VStack space={2}>
        <Heading color="text.900" size="sm">
          {props.name}
        </Heading>

        {props.access ? (
          <HStack space={1} alignItems="center">
            <CircleIcon size="8px" color={AccessTypes[props.access].color} />
            <Text color="muted.700">{AccessTypes[props.access].text}</Text>
          </HStack>
        ) : (
          <Spinner accessibilityLabel="Loading status" />
        )}

        {props.access === 'partial' && (
          <HStack space="2" alignItems="center" bg="muted.200" rounded="8" p="2">
            <InfoIcon />
            <Text color="muted.800">
              If you can’t access the website, make sure both your current ipv4 and ipv6 are
              whitelisted.
            </Text>
          </HStack>
        )}
      </VStack>
      <ChevronRightIcon position="absolute" top="8" right="4" />
    </Pressable>
  )
}
