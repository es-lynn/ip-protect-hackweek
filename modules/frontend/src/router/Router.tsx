import { Ionicons } from '@expo/vector-icons'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Avatar, Icon, Pressable } from 'native-base'
import React from 'react'

import { colors } from '../components/Avatar'
import { NavBarButtons } from '../components/NavBarButtons'
import { DebugLoginPage } from '../pages/auth/login/DebugLoginPage'
import { LoginPage } from '../pages/auth/login/LoginPage'
import { RedirectPage } from '../pages/auth/redirect/RedirectPage'
import { DebugPage } from '../pages/debug/DebugPage'
import { HomePage } from '../pages/home/HomePage'
import { InvitePage } from '../pages/invite/InvitePage'
import { ProjectPage } from '../pages/project/ProjectPage'
import { sp } from '../styles/space'
import { format } from '../utils/format'
import { generateRandomNumber } from '../utils/random.util'
import { nav, navigationRef } from './nav'
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
          headerLeft: () => (
            <Pressable onPress={() => nav.navigate(path.home.index)}>
              <Icon
                as={Ionicons}
                name="home"
                color="white"
                size={7}
                style={{ marginLeft: sp._16 }}
              />
            </Pressable>
          ),
          headerRight: NavBarButtons,
          headerStyle: { backgroundColor: '#0E7490' },
          headerTintColor: '#FFFFFF',
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 24 }
          // header: props => {
          //   return (
          //     <Box
          //       tintColor={props.options.headerTintColor}
          //       bg={props.options.headerStyle?.['backgroundColor']}
          //     >
          //       {props.options.back}
          //       Hi
          //     </Box>
          //   )
          // }
        }}
      >
        <Stack.Screen
          name={path.auth.login}
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={path.auth.debuglogin}
          component={DebugLoginPage}
          options={{ headerRight: undefined }}
        />
        <Stack.Screen name={path.auth.redirect} component={RedirectPage} />
        <Stack.Screen
          name={path.invite.index}
          component={InvitePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={path.debug.index} component={DebugPage} />
        <Stack.Screen
          name={path.home.index}
          component={HomePage}
          options={{ contentStyle: { backgroundColor: '#F5F5F5' } }}
        />
        <Stack.Screen name={'project/:projectFriendlyId'} component={ProjectPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
