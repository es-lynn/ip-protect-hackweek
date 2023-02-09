import { Box, Button, Image, Text, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'

interface Props {
  title: string
  onPressLogin: () => void
}

export const LoginPageView = (props: Props) => {
  return (
    <SafeAreaView>
      <Box bg="primary.700" h="190px" position="absolute" w="100%" />
      <Box rounded="lg" px={3} py={2} mt={16} mb={16} bg="white" alignSelf="center">
        <Image
          src={require('../../../../../assets/logo.png')}
          height="32px"
          width="146px"
          resizeMode="contain"
        />
      </Box>
      <VStack roundedTop="lg" bg="white" pt={12} px={16}>
        <Text fontSize="3xl" fontWeight="500" color="muted.700" textAlign="center">
          {props.title}
        </Text>
        <Text fontSize="md" color="muted.700" textAlign="center" mt={2}>
          Log in or sign up with your Google account
        </Text>
        <Button mt="5" onPress={() => props.onPressLogin()}>
          Continue with Google
        </Button>
      </VStack>
    </SafeAreaView>
  )
}
