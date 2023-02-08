import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { NavBarButtons } from '../components/NavBarButtons'
import { LoginPage } from '../pages/auth/login/LoginPage'
import { RedirectPage } from '../pages/auth/redirect/RedirectPage'
import { DebugPage } from '../pages/debug/DebugPage'
import { HomePage } from '../pages/home/HomePage'
import { InvitePage } from '../pages/invite/InvitePage'
import { ProjectPage } from '../pages/project/ProjectPage'
import { navigationRef } from './nav'
import { route } from './route'

const Stack = createNativeStackNavigator()

export const Router = (): React.ReactElement => {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={{
        prefixes: [],
        enabled: true,
        config: {
          screens: {
            [route.debug.index]: 'debug',
            [route.auth.login]: 'auth/login',
            [route.auth.redirect]: 'auth/redirect',
            [route.home.index]: 'home',
            [route.invite.index]: 'invite',
            'project/:projectFriendlyId': 'project/:projectFriendlyId'
          }
        }
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerRight: NavBarButtons,
          headerStyle: { backgroundColor: '#0E7490' },
          headerTintColor: '#FFFFFF',
          headerShadowVisible: false
        }}
      >
        <Stack.Screen
          name={route.auth.login}
          component={LoginPage}
          options={{ headerRight: undefined }}
        />
        <Stack.Screen name={route.auth.redirect} component={RedirectPage} />
        <Stack.Screen name={route.invite.index} component={InvitePage} />
        <Stack.Screen name={route.debug.index} component={DebugPage} />
        <Stack.Screen name={route.home.index} component={HomePage} />
        <Stack.Screen name={'project/:projectFriendlyId'} component={ProjectPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
