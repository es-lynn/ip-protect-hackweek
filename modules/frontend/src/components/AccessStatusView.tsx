import { CircleIcon, HStack, Text } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'

export type Access = 'full' | 'partial' | 'none'

type AccessType = {
  [key in Access]: { text: string; color: ColorType }
}

const AccessTypes: AccessType = {
  full: { text: 'Full access', color: 'tertiary.600' },
  partial: { text: 'May not have access', color: 'warning.400' },
  none: { text: 'No access', color: 'error.700' }
}

interface Props {
  access: Access
}
export const AccessStatusView = (props: Props) => {
  return (
    <HStack space={1} alignItems="center">
      <CircleIcon size="8px" color={AccessTypes[props.access].color} />
      <Text color="muted.700" fontSize="xs">
        {AccessTypes[props.access].text}
      </Text>
    </HStack>
  )
}
