import { ChevronRightIcon, Heading, HStack, Pressable } from 'native-base'

import { Access } from '../../../components/AccessStatusView'

interface Props {
  name: string
  access?: Access
  onPress?: () => void
}

// TODO: get the access status working

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
      {/*<VStack space={2} alignItems="start">*/}
      {/*  <Heading color="text.900" size="sm">*/}
      {/*    {props.name}*/}
      {/*  </Heading>*/}

      {/* TODO put back once home page can determine access for all projects */}
      {/*{props.access ? (*/}
      {/*  <AccessStatusView access={props.access} />*/}
      {/*) : (*/}
      {/*  <Spinner accessibilityLabel="Loading status" size="sm" />*/}
      {/*)}*/}

      {/*{props.access === 'partial' && (*/}
      {/*  <HStack space="2" alignItems="center" bg="muted.200" rounded="8" p="2">*/}
      {/*    <InfoIcon />*/}
      {/*    <Text color="muted.800">*/}
      {/*      If you can’t access the website, make sure both your current ipv4 and ipv6 are*/}
      {/*      whitelisted.*/}
      {/*    </Text>*/}
      {/*  </HStack>*/}
      {/*)}*/}
      {/*</VStack>*/}
      {/*<ChevronRightIcon position="absolute" top="8" right="4" />*/}

      <HStack justifyContent="space-between">
        <Heading color="text.900" size="sm">
          {props.name}
        </Heading>
        <ChevronRightIcon />
      </HStack>
    </Pressable>
  )
}
