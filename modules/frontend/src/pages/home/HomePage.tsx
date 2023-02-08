import { useAuth0 } from '@auth0/auth0-react'
import { config } from 'dotenv'
import { AddIcon, IconButton, Button, View, VStack } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'

import { Project } from '../../../lib/api/Api'
import { AppContext } from '../../App.context'
import { api, Cfg } from '../../config/config'
import { Modal } from '../../modal/ModalController'
import { nav } from '../../router/nav'
import { route } from '../../router/route'
import { sp } from '../../styles/space'
import { throwToastError } from '../../toast/Toast'
import { ProjectAddDialog } from './_components/ProjectAddDialog'
import { ProjectListView } from './_components/ProjectListView/ProjectListView'

// TODO: reload page after adding project

export const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>()
  // const [whitelist, setWhitelist] = useState<Record<string, IpAddressWhitelistedRes>>({})
  const { ipv4, ipv6 } = useContext(AppContext)
  const { logout } = useAuth0()

  useEffect(() => {
    api.me
      .meProjectsList()
      .then(data => {
        const projects = data.data.projects
        setProjects(projects)
      })
      .catch(err => {
        nav.navigate(route.auth.login)
        throwToastError(err)
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
      <View bg="primary.700" w="full" h="50px" position="absolute" />
      <Button
        onPress={() =>
          Modal.confirm2({
            title: 'Logout',
            type: 'danger',
            body: 'Are you sure you wish to logout?',
            onConfirm: () => logout({ logoutParams: { returnTo: Cfg.APP_DOMAIN } }),
            confirmText: 'Logout'
          })
        }
      >
        Logout
      </Button>
      <VStack mx={4} space={4}>
        <ProjectListView projects={projects} />
        <Button
          leftIcon={<AddIcon />}
          alignSelf="start"
          variant="outline"
          onPress={() => Modal.dialog(props => <ProjectAddDialog {...props} />)}
        >
          Create new project
        </Button>
      </VStack>
    </SafeAreaView>
  )
}
