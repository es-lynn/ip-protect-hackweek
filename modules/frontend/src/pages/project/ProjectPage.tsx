import { A } from '@expo/html-elements'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Chip, List, SegmentedButtons, Text } from 'react-native-paper'

import {
  ListResIpAddress,
  User,
  Webpage,
  WebpageListRes
} from '../../../lib/api/Api'
import { api } from '../../config/config'
import { nav } from '../../router/nav'
import { sp } from '../../styles/space'

export const ProjectPage = ({ route }: { route: any }) => {
  const projectFriendlyId = route.params.projectFriendlyId
  const [segmentedButtonValue, setSegmentedButtonValue] =
    useState<string>('ip-address')

  const [ipAddresses, setIpAddresses] = useState<ListResIpAddress[]>()
  const [webpages, setWebpages] = useState<Webpage[]>()
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    api.project
      .ipaddressList(projectFriendlyId)
      .then(data => setIpAddresses(data.data.ipAddresses))

    api.project
      .webpageList(projectFriendlyId)
      .then(data => setWebpages(data.data.webpages))

    api.project
      .userList(projectFriendlyId)
      .then(data => setUsers(data.data.users))
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
        (webpages?.map(webpage => (
          <A href={webpage.url}>
            <List.Item
              key={webpage.id}
              title={webpage.url}
              description={webpage.name}
            />
          </A>
        )) ?? <ActivityIndicator size={'large'} />)}

      {segmentedButtonValue === 'users' &&
        (users?.map(user => (
          <List.Item
            key={user.id}
            title={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{user.name}</Text>
                {user.isAdmin && (
                  <Chip style={{ marginLeft: sp._8 }}>Admin</Chip>
                )}
              </View>
            )}
            description={`[${user.provider}] ${user.providerId}`}
          />
        )) ?? <ActivityIndicator size={'large'} />)}
    </SafeAreaView>
  )
}
