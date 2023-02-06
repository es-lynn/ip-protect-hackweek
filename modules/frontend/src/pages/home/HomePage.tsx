import { Button } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Card, Text } from 'react-native-paper'

import { Project } from '../../../lib/api/Api'
import { AppContext } from '../../App.context'
import { api } from '../../config/config'
import { Modal } from '../../modal/ModalController'
import { sp } from '../../styles/space'
import { ProjectAddDialog } from './_components/ProjectAddDialog'
import { ProjectListView } from './_components/ProjectListView/ProjectListView'
import { formatIpAddress } from './HomePage.util'

export const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  // const [whitelist, setWhitelist] = useState<Record<string, IpAddressWhitelistedRes>>({})
  const { ipv4, ipv6 } = useContext(AppContext)

  useEffect(() => {
    api.me.meProjectsList().then(data => {
      const projects = data.data.projects
      setProjects(projects)
    })
  }, [])

  // // FIXME: Definitely not my prettiest code
  // useEffect(() => {
  //   projects.forEach(project => {
  //     if (ipv6) {
  //       api.project
  //         .ipaddressWhitelisted(project.friendlyId, {
  //           ipAddress: ipv6
  //         })
  //         .then(data => {
  //           setWhitelist(prev => ({ ...prev, [project.friendlyId]: data.data }))
  //         })
  //     }
  //   })
  // }, [projects, ipv6])

  return (
    <SafeAreaView>
      <View style={{ margin: sp._24 }}>
        <Card style={{}}>
          <Card.Content>
            <Text style={{ marginBottom: sp._4 }} variant={'titleMedium'}>
              IPv4 Address
            </Text>
            {ipv4 !== undefined ? (
              <Text variant={'displayMedium'}>{formatIpAddress(ipv4)}</Text>
            ) : (
              <ActivityIndicator size={'large'} style={{ alignSelf: 'flex-start' }} />
            )}

            <Text style={{ marginTop: sp._8, marginBottom: sp._4 }} variant={'titleMedium'}>
              IPv6 Address
            </Text>
            {ipv6 !== undefined ? (
              <Text variant={'displaySmall'}>{formatIpAddress(ipv6)}</Text>
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
