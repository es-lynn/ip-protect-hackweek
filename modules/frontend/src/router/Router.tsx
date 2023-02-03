import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { LoginPage } from '../pages/auth/login/LoginPage'
import { RedirectPage } from '../pages/auth/redirect/RedirectPage'
import { DebugPage } from '../pages/debug/DebugPage'
import { HomePage } from '../pages/home/HomePage'
import { ProjectPage } from '../pages/project/ProjectPage'
import { navigationRef } from './nav'
import { route } from './route'

const Stack = createNativeStackNavigator()

export const Router = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={{
        prefixes: [],
        enabled: true,
        config: {
          screens: {
            [route.debug.index]: 'Debug',
            [route.auth.login]: 'Login',
            [route.home.index]: 'Home',
            'project/:projectFriendlyId': 'project/:projectFriendlyId'
          }
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name={route.auth.login} component={LoginPage} />
        <Stack.Screen name={route.auth.redirect} component={RedirectPage} />
        <Stack.Screen name={route.debug.index} component={DebugPage} />
        <Stack.Screen name={route.home.index} component={HomePage} />
        <Stack.Screen name={'project/:projectFriendlyId'} component={ProjectPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
