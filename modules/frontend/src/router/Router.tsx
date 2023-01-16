import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import React from 'react'

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
            home: 'home',
            'project/:projectFriendlyId': 'project/:projectFriendlyId'
          }
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name={'home'} component={HomePage} />
        <Stack.Screen
          name={'project/:projectFriendlyId'}
          component={ProjectPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
