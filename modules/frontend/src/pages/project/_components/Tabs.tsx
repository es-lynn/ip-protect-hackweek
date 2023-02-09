import { Badge, Box, Center, HStack, Pressable, Text } from 'native-base'

interface Props {
  labels: { label: string; value?: string; badge?: number }[]
  selected?: string
  onPressTab?: (index: string) => void
}

export const Tabs: React.FC<Props> = ({ labels, selected, onPressTab }: Props) => {
  return (
    <Box roundedTop="8" bg="white" borderBottomColor="text.200" borderBottomWidth={3}>
      <HStack maxWidth={500} w="100%" alignSelf="center" mb="-3px">
        {labels.map(label => {
          const value = label.value ?? label.label
          return (
            <Pressable
              key={'tab-' + value}
              flexGrow={1}
              flexBasis={0}
              borderBottomColor={value === selected ? 'primary.500' : 'text.200'}
              borderBottomWidth={3}
              pb={2}
              pt={4}
              roundedTop="8"
              onPress={() => onPressTab?.(value)}
              _hover={{ bg: 'muted.100' }}
            >
              <Center>
                <HStack space={1}>
                  <Text fontWeight={400}>{label.label}</Text>
                  {label.badge !== undefined && (
                    <Badge rounded="full" variant="subtle" colorScheme="coolGray">
                      {label.badge}
                    </Badge>
                  )}
                </HStack>
              </Center>
            </Pressable>
          )
        })}
      </HStack>
    </Box>
  )
}
