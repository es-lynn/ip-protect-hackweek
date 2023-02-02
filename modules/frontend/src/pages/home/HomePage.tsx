import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Card, Text } from 'react-native-paper'

import { api } from '../../config/config'
import { Modal } from '../../modal/ModalController'
import { ipify } from '../../services/ipify'
import { sp } from '../../styles/space'
import { ProjectAddDialog } from './_components/ProjectAddDialog'
import { ProjectListView } from './_components/ProjectListView'

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
              <ActivityIndicator size={'large'} style={{ alignSelf: 'flex-start' }} />
            )}

            <Text style={{ marginTop: sp._8, marginBottom: sp._4 }} variant={'titleMedium'}>
              IPv6 Address
            </Text>
            {ipv6 ? (
              <Text variant={'displaySmall'}>{ipv6}</Text>
            ) : (
              <ActivityIndicator size={'large'} style={{ alignSelf: 'flex-start' }} />
            )}
          </Card.Content>
        </Card>
        <Text style={{ marginTop: sp._24 }} variant={'titleLarge'}>
          Projects
        </Text>
        <ProjectListView projects={projects} />
        <Button onPress={() => Modal.dialog(props => <ProjectAddDialog {...props} />)}>
          Add Project
        </Button>
      </View>
    </SafeAreaView>
  )
}
