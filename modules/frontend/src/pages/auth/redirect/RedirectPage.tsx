import { useAuth0 } from '@auth0/auth0-react'
import { Button, Text, View } from 'native-base'
import React from 'react'
import { ActivityIndicator, SafeAreaView } from 'react-native'

import { LoginDialog } from './_components/LoginDialog'

export const LoginPage = () => {
  const { user, isLoading, isAuthenticated } = useAuth0()

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View>
          {isAuthenticated && (
            <View>
              <Text>{user?.name}</Text>
              <Text>{user?.email}</Text>
              <Text>{JSON.stringify(user)}</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}
