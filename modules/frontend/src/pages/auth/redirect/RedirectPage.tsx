import { useAuth0 } from '@auth0/auth0-react'
import { Text, View } from 'native-base'
import React from 'react'
import { ActivityIndicator, SafeAreaView } from 'react-native'

import { api, authorization } from '../../../config/config'
import { useAsyncEffect } from '../../../hooks/useAsyncEffect'
import { nav } from '../../../router/nav'
import { route } from '../../../router/route'
import { throwToastAPIError } from '../../../toast/Toast'

export const RedirectPage = () => {
  const { user, isLoading, isAuthenticated, getIdTokenClaims } = useAuth0()
  const inviteCode = sessionStorage.getItem('inviteCode')

  useAsyncEffect(async () => {
    if (isAuthenticated) {
      const idToken = await getIdTokenClaims()
      if (inviteCode) {
        await api.auth
          .authRegister({ idToken: idToken!.__raw, code: inviteCode })
          .catch(throwToastAPIError)
      }
      authorization.setBearer(idToken?.__raw as any)
      nav.navigate(route.home.index)
    }
  }, [isAuthenticated])

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
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}
