import { Auth0Provider } from '@auth0/auth0-react'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { Provider } from 'react-native-paper'

import { AppContextProvider } from './src/App.context'
import { Cfg } from './src/config/config'
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
        <Auth0Provider
          domain={Cfg.auth0.domain}
          clientId={Cfg.auth0.clientId}
          authorizationParams={{
            redirect_uri: Cfg.auth0.redirectUri
          }}
        >
          <AppContextProvider>
            <ModalProvider ref={ref => Modal.setModal(ref)} />
            <Router />
          </AppContextProvider>
        </Auth0Provider>
      </NativeBaseProvider>
    </Provider>
  )
}
