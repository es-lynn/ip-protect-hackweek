import { IdToken, useAuth0 } from '@auth0/auth0-react'
import { Button, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView } from 'react-native'

export const InvitePage = ({ route }: any) => {
  const { loginWithRedirect } = useAuth0()

  // TODO: Needs a parse function
  const code = route.params.code

  return (
    <SafeAreaView>
      <View>
        <Text>You have been invited to join IProtect!</Text>
        <Button
          onPress={() => {
            sessionStorage.setItem('inviteCode', code)
            loginWithRedirect()
          }}
        >
          Register
        </Button>
      </View>
    </SafeAreaView>
  )
}
