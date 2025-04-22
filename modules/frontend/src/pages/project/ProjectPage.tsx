import { useNavigation } from '@react-navigation/native'
import { Box } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

import { NavBar } from '../../components/NavBar'
import { NavBarButtons } from '../../components/NavBarButtons'
import { withContext } from '../../hoc/withContext'
import { IpAddressView } from './_components/IPAddress/IpAddressView'
import { Tabs } from './_components/Tabs'
import { UserView } from './_components/User/UserView'
import { WebpageView } from './_components/Webpage/WebpageView'
import { ProjectPageContext, ProjectPageContextProvider } from './ProjectPage.context'

export const _ProjectPage: React.FC = () => {
  const {
    webpages,
    users,
    ipAddresses,
    projectFriendlyId,
    whitelistedV4,
    whitelistedV6,
    access,
    isAdmin,
    deleteWebpage,
    addWebpage,
    deleteIpAddress,
    addIpAddress,
    editProjectUserRole,
    addProjectUser,
    removeProjectUser,
    createInviteLink,
    deleteProject
  } = useContext(ProjectPageContext)

  const [selectedTab, setSelectedTab] = useState<string>('ip-address')
  const nav = useNavigation()

  useEffect(() => {
    nav.setOptions({
      title: projectFriendlyId,
      headerTitleAlign: 'center',
      header: NavBar(access),
      headerRight: NavBarButtons({
        isAdmin: isAdmin,
        onPressDelete: () => deleteProject(projectFriendlyId)
        // TODO edit
      })
    })
  }, [nav, isAdmin, access])

  return (
    <Box height="100%">
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: 'white' }}>
          <Box maxWidth={480} w="100%" alignSelf="center" pt={50}>
            {selectedTab === 'ip-address' && (
              <IpAddressView
                ipAddresses={ipAddresses}
                whitelistedV4={whitelistedV4}
                whitelistedV6={whitelistedV6}
                projectFriendlyId={projectFriendlyId}
                deleteIpAddress={deleteIpAddress}
                addIpAddress={addIpAddress}
              />
            )}

            {selectedTab === 'websites' && (
              <WebpageView
                webpages={webpages}
                projectFriendlyId={projectFriendlyId}
                addWebpage={addWebpage}
                deleteWebpage={deleteWebpage}
                isAdmin={isAdmin}
              />
            )}

            {selectedTab === 'users' && (
              <UserView
                users={users}
                projectFriendlyId={projectFriendlyId}
                editProjectUserRole={editProjectUserRole}
                addProjectUser={addProjectUser}
                removeProjectUser={removeProjectUser}
                createInviteLink={createInviteLink}
                isAdmin={isAdmin}
              />
            )}
          </Box>
        </SafeAreaView>
      </ScrollView>
      <Box position="absolute" w="100%" bg="primary.700">
        <Tabs
          labels={[
            { label: 'IP addresses', value: 'ip-address', badge: ipAddresses?.length },
            { label: 'Websites', value: 'websites', badge: webpages?.length },
            { label: 'Users', value: 'users', badge: users?.length }
          ]}
          selected={selectedTab}
          onPressTab={index => setSelectedTab(index)}
        />
      </Box>
    </Box>
  )
}

export const ProjectPage = withContext(_ProjectPage, ProjectPageContextProvider)
