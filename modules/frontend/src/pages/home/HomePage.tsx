import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Card, List, Text, Title } from 'react-native-paper'

import { Api } from '../../../lib/api.ts/Api'
import { api } from '../../config/config'
import { ipify } from '../../services/ipify'
import { sp } from '../../styles/space'

export const HomePage = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [ipv4, setIpv4] = useState<string>()
  const [ipv6, setIpv6] = useState<string>()

  useEffect(() => {
    api.me.meProjectsList().then(data => {
      setProjects(data.data.projects)
    })
    ipify.fetchIpAddress().then(data => {
      setIpv4(data.ipv4)
      setIpv6(data.ipv6 ?? 'N/A')
    })
  }, [])

  return (
    <SafeAreaView>
      <View style={{ margin: sp._24 }}>
        <Card style={{}}>
          <Card.Content>
            <Text style={{ marginBottom: sp._4 }} variant={'titleMedium'}>
              IPv4 Address
            </Text>
            {ipv4 ? (
              <Text variant={'displayMedium'}>{ipv4}</Text>
            ) : (
              <ActivityIndicator
                size={'large'}
                style={{ alignSelf: 'flex-start' }}
              />
            )}

            <Text
              style={{ marginTop: sp._8, marginBottom: sp._4 }}
              variant={'titleMedium'}
            >
              IPv6 Address
            </Text>
            {ipv6 ? (
              <Text variant={'displaySmall'}>{ipv6}</Text>
            ) : (
              <ActivityIndicator
                size={'large'}
                style={{ alignSelf: 'flex-start' }}
              />
            )}
          </Card.Content>
        </Card>
        <Text style={{ marginTop: sp._24 }} variant={'titleLarge'}>
          Projects
        </Text>
        {projects.map(project => (
          <List.Item
            key={project.id}
            title={project.friendlyId}
            description={project.id}
            onPress={() => {}}
            left={props => <List.Icon {...props} icon="folder" />}
            right={() => <List.Icon icon={'chevron-right'} />}
          />
        ))}
      </View>
    </SafeAreaView>
  )
}
