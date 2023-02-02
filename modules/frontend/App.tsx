import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { Provider } from 'react-native-paper'

import { AppContextProvider } from './src/App.context'
import { Modal } from './src/modal/ModalController'
import { ModalProvider } from './src/modal/ModalProvider'
import { Router } from './src/router/Router'
export default function App() {
  return (
    <Provider
      theme={{
        dark: false
      }}
    >
      <NativeBaseProvider>
        <AppContextProvider>
          <ModalProvider ref={ref => Modal.setModal(ref)} />
          <Router />
        </AppContextProvider>
      </NativeBaseProvider>
    </Provider>
  )
}
