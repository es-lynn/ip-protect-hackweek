import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { NavBar } from '../components/NavBar'
import { NavBarButtons } from '../components/NavBarButtons'
import { DebugLoginPage } from '../pages/auth/login/DebugLoginPage'
import { LoginPage } from '../pages/auth/login/LoginPage'
import { RedirectPage } from '../pages/auth/redirect/RedirectPage'
import { DebugPage } from '../pages/debug/DebugPage'
import { HomePage } from '../pages/home/HomePage'
import { InvitePage } from '../pages/invite/InvitePage'
import { ProjectPage } from '../pages/project/ProjectPage'
import { navigationRef } from './nav'
import { path } from './route'

const Stack = createNativeStackNavigator()

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

export const Router = (): React.ReactElement => {
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={Theme}
      linking={{
        prefixes: [],
        enabled: true,
        config: {
          screens: {
            [path.debug.index]: 'debug',
            [path.auth.login]: 'auth/login',
            [path.auth.debuglogin]: 'auth/debuglogin',
            [path.auth.redirect]: 'auth/redirect',
            [path.home.index]: 'home',
            [path.invite.index]: 'invite',
            'project/:projectFriendlyId': 'project/:projectFriendlyId'
          }
        }
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerRight: NavBarButtons(),
          headerTintColor: '#FFFFFF',
          headerBackVisible: false,
          headerShown: false,
          header: NavBar()
        }}
      >
        <Stack.Screen name={path.auth.login} component={LoginPage} />
        <Stack.Screen name={path.auth.debuglogin} component={DebugLoginPage} />
        <Stack.Screen name={path.auth.redirect} component={RedirectPage} />
        <Stack.Screen name={path.invite.index} component={InvitePage} />
        <Stack.Screen name={path.debug.index} component={DebugPage} />
        <Stack.Screen
          name={path.home.index}
          component={HomePage}
          options={{ headerShown: true, contentStyle: { backgroundColor: '#F5F5F5' } }}
        />
        <Stack.Screen
          name={'project/:projectFriendlyId'}
          component={ProjectPage}
          options={{ headerShown: true, headerBackVisible: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
