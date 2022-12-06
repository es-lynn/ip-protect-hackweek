import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-native-paper'

import { HomePage } from './src/pages/home/HomePage'

export default function App() {
  return (
    <Provider
      theme={{
        dark: false
      }}
    >
      <HomePage />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
