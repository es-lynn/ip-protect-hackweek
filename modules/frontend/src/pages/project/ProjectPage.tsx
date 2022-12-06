import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { List, SegmentedButtons, Text } from 'react-native-paper'

import { ListResIpAddress } from '../../../lib/api.ts/Api'
import { api } from '../../config/config'
import { nav } from '../../router/nav'
import { sp } from '../../styles/space'

export const ProjectPage = ({ route }: { route: any }) => {
  const projectFriendlyId = route.params.projectFriendlyId
  const [ipAddresses, setIpAddresses] = useState<ListResIpAddress[]>()
  const [segmentedButtonValue, setSegmentedButtonValue] =
    useState<string>('ip-address')

  useEffect(() => {
    api.project
      .ipaddressList(projectFriendlyId)
      .then(data => setIpAddresses(data.data.ipAddresses))
  }, [])

  return (
    <SafeAreaView style={{ padding: sp._24 }}>
      <Text>{projectFriendlyId}</Text>
      <SegmentedButtons
        value={segmentedButtonValue}
        onValueChange={setSegmentedButtonValue}
        buttons={[
          { value: 'ip-address', label: 'IP Addresses' },
          { value: 'websites', label: 'Websites' },
          { value: 'users', label: 'Users' }
        ]}
      />
      {segmentedButtonValue === 'ip-address' &&
        (ipAddresses?.map(ip => (
          <List.Item key={ip.id} title={ip.ip} description={ip.tag} />
        )) ?? <ActivityIndicator size={'large'} />)}
      {segmentedButtonValue === 'websites' &&
        (ipAddresses?.map(ip => (
          <List.Item key={ip.id} title={ip.ip} description={ip.tag} />
        )) ?? <ActivityIndicator size={'large'} />)}
    </SafeAreaView>
  )
}
