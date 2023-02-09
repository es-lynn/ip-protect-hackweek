import { Box, Button, FormControl, Input } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'

import { Cfg, credentials } from '../../config/config'
import { useFormState } from '../../hooks/useFormState'
import { nav } from '../../router/nav'
import { path } from '../../router/route'
import { sp } from '../../styles/space'

export const DebugPage = () => {
  const [cfgForm, setCfgForm] = useFormState<typeof Cfg>({
    APP_DOMAIN: Cfg.APP_DOMAIN,
    API_URL: Cfg.API_URL ?? '',
    BASIC_AUTH_PASSWORD: Cfg.BASIC_AUTH_PASSWORD ?? '',
    BASIC_AUTH_UID: Cfg.BASIC_AUTH_UID ?? '',
    auth0: {
      clientId: Cfg.auth0.clientId,
      domain: Cfg.auth0.domain,
      redirectUri: Cfg.auth0.redirectUri
    }
  })

  return (
    <SafeAreaView>
      <Box style={{ padding: sp._16 }}>
        <FormControl>
          <FormControl.Label>API_URL</FormControl.Label>
          <Input
            isDisabled={true}
            value={cfgForm.API_URL}
            onChangeText={text => {
              setCfgForm('API_URL', text)
            }}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormControl.Label>BASIC_AUTH_UID</FormControl.Label>
          <Input
            value={cfgForm.BASIC_AUTH_UID}
            onChangeText={text => {
              setCfgForm('BASIC_AUTH_UID', text)
            }}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormControl.Label>BASIC_AUTH_PASSWORD</FormControl.Label>
          <Input
            value={cfgForm.BASIC_AUTH_PASSWORD}
            onChangeText={text => {
              setCfgForm('BASIC_AUTH_PASSWORD', text)
            }}
          />
        </FormControl>
        <Button
          mt={sp._8}
          onPress={() => {
            Cfg.API_URL = cfgForm.API_URL
            Cfg.BASIC_AUTH_UID = cfgForm.BASIC_AUTH_UID
            credentials.uid = cfgForm.BASIC_AUTH_UID
            Cfg.BASIC_AUTH_PASSWORD = cfgForm.BASIC_AUTH_PASSWORD
            credentials.password = cfgForm.BASIC_AUTH_PASSWORD
            nav.navigate(path.home.index)
          }}
        >
          Save
        </Button>
      </Box>
    </SafeAreaView>
  )
}
