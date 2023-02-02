import { CircleIcon } from 'native-base'
import React, { useContext, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { SegmentedButtons, Text } from 'react-native-paper'

import { withContext } from '../../hoc/withContext'
import { sp } from '../../styles/space'
import { IpAddressView } from './_components/IPAddress/IpAddressView'
import { UserView } from './_components/User/UserView'
import { WebpageView } from './_components/Webpage/WebpageView'
import { ProjectPageContext, ProjectPageContextProvider } from './ProjectPage.context'

export const _ProjectPage = () => {
  const {
    webpages,
    users,
    ipAddresses,
    projectFriendlyId,
    whitelisted,
    deleteWebpage,
    addWebpage,
    deleteIpAddress,
    addIpAddress,
    editProjectUserRole,
    addProjectUser,
    removeProjectUser
  } = useContext(ProjectPageContext)

  const [segmentedButtonValue, setSegmentedButtonValue] = useState<string>('ip-address')

  return (
    <SafeAreaView style={{ padding: sp._24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{projectFriendlyId}</Text>
        {whitelisted ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CircleIcon
              style={{ marginLeft: sp._8, color: whitelisted.isWhitelisted ? 'green' : 'red' }}
            />
            {whitelisted.ipAddress?.tag && (
              <Text style={{ marginLeft: sp._4 }}>({whitelisted.ipAddress.tag})</Text>
            )}
            {whitelisted.isMyIp === false && (
              <Text style={{ marginLeft: sp._4 }}>[whitelisted by {whitelisted.user?.name}]</Text>
            )}
          </View>
        ) : (
          <ActivityIndicator size={'small'} />
        )}
      </View>
      <SegmentedButtons
        value={segmentedButtonValue}
        onValueChange={setSegmentedButtonValue}
        buttons={[
          { value: 'ip-address', label: 'IP Addresses' },
          { value: 'websites', label: 'Websites' },
          { value: 'users', label: 'Users' }
        ]}
      />
      {segmentedButtonValue === 'ip-address' && (
        <IpAddressView
          ipAddresses={ipAddresses}
          whitelistedIpAddress={whitelisted?.ipAddress}
          projectFriendlyId={projectFriendlyId}
          deleteIpAddress={deleteIpAddress}
          addIpAddress={addIpAddress}
        />
      )}

      {segmentedButtonValue === 'websites' && (
        <WebpageView
          webpages={webpages}
          projectFriendlyId={projectFriendlyId}
          addWebpage={addWebpage}
          deleteWebpage={deleteWebpage}
        />
      )}

      {segmentedButtonValue === 'users' && (
        <UserView
          users={users}
          projectFriendlyId={projectFriendlyId}
          editProjectUserRole={editProjectUserRole}
          addProjectUser={addProjectUser}
          removeProjectUser={removeProjectUser}
        />
      )}
    </SafeAreaView>
  )
}

export const ProjectPage = withContext(_ProjectPage, ProjectPageContextProvider)
