import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-native-paper'

import { Modal } from './src/modal/ModalController'
import { ModalProvider } from './src/modal/ModalProvider'
import { HomePage } from './src/pages/home/HomePage'
import { Router } from './src/router/Router'
export default function App() {
  return (
    <Provider
      theme={{
        dark: false
      }}
    >
      <NativeBaseProvider>
        <ModalProvider ref={ref => Modal.setModal(ref)} />
        <Router />
      </NativeBaseProvider>
    </Provider>
  )
}
