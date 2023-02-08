import { useNavigation } from '@react-navigation/native'
import { Box, CircleIcon } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Text } from 'react-native-paper'

import { AccessStatusView } from '../../components/AccessStatusView'
import { withContext } from '../../hoc/withContext'
import { sp } from '../../styles/space'
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
    deleteWebpage,
    addWebpage,
    deleteIpAddress,
    addIpAddress,
    editProjectUserRole,
    addProjectUser,
    removeProjectUser,
    createInviteLink
  } = useContext(ProjectPageContext)

  const [selectedTab, setSelectedTab] = useState<string>('ip-address')
  const nav = useNavigation()

  useEffect(() => {
    nav.setOptions({ title: projectFriendlyId, headerTitleAlign: 'center' })
  }, [nav])

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <Box bg="primary.700" w="full" h="50px" position="absolute" />
      {access && (
        <Box mb={5} rounded="full" bg="white:alpha.80" alignSelf="center" px={2}>
          <AccessStatusView access={access} />
        </Box>
      )}
      <Tabs
        labels={[
          { label: 'IP addresses', value: 'ip-address', badge: ipAddresses?.length },
          { label: 'Websites', value: 'websites', badge: webpages?.length },
          { label: 'Users', value: 'users', badge: users?.length }
        ]}
        selected={selectedTab}
        onPressTab={index => setSelectedTab(index)}
      />

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
        />
      )}
    </SafeAreaView>
  )
}

export const ProjectPage = withContext(_ProjectPage, ProjectPageContextProvider)
