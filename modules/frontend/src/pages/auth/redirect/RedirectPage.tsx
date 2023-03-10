import { useAuth0 } from '@auth0/auth0-react'
import { Spinner, Text, View } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'

import { api, authorization } from '../../../config/config'
import { useAsyncEffect } from '../../../hooks/useAsyncEffect'
import { nav } from '../../../router/nav'
import { path } from '../../../router/route'
import { throwToastAPIError } from '../../../toast/Toast'

export const RedirectPage = () => {
  const { user, isLoading, isAuthenticated, getIdTokenClaims } = useAuth0()
  const inviteCode = sessionStorage.getItem('inviteCode')

  useAsyncEffect(async () => {
    if (isAuthenticated) {
      const idToken = await getIdTokenClaims()
      authorization.setBearer(idToken?.__raw as any)
      if (inviteCode) {
        sessionStorage.removeItem('inviteCode')
        await api.auth
          .authRegister({ idToken: idToken!.__raw, code: inviteCode })
          .then(data => {
            nav.navigate('project/:projectFriendlyId', {
              projectFriendlyId: data.data.projectId
            })
          })
          .catch(throwToastAPIError)
      } else {
        nav.navigate(path.home.index)
      }
    }
  }, [isAuthenticated])

  return (
    <SafeAreaView>
      {isLoading ? (
        <Spinner size="lg" mt={32} />
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
