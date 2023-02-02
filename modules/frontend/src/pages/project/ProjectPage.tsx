import { A } from '@expo/html-elements'
import {
  ArrowForwardIcon,
  Button,
  Icon,
  IconButton,
  Menu,
  Pressable,
  ThreeDotsIcon
} from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native'
import { Chip, List, SegmentedButtons, Text } from 'react-native-paper'

import { ListResIpAddress, User, Webpage, WebpageListRes } from '../../../lib/api/Api'
import { api } from '../../config/config'
import { withContext } from '../../hoc/withContext'
import { Modal } from '../../modal/ModalController'
import { nav } from '../../router/nav'
import { sp } from '../../styles/space'
import { IpAddressView } from './_components/IPAddress/IpAddressView'
import { UserView } from './_components/User/UserView'
import { ProjectPageDeleteModal } from './_components/Webpage/ProjectPageDeleteModal'
import { WebpageView } from './_components/Webpage/WebpageView'
import { ProjectPageContext, ProjectPageContextProvider } from './ProjectPage.context'

export const _ProjectPage = () => {
  const {
    webpages,
    users,
    ipAddresses,
    projectFriendlyId,
    deleteWebpage,
    addWebpage,
    deleteIpAddress,
    addIpAddress,
    editProjectUserRole
  } = useContext(ProjectPageContext)

  const [segmentedButtonValue, setSegmentedButtonValue] = useState<string>('ip-address')

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
      {segmentedButtonValue === 'ip-address' && (
        <IpAddressView
          ipAddresses={ipAddresses}
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
        />
      )}
    </SafeAreaView>
  )
}

export const ProjectPage = withContext(_ProjectPage, ProjectPageContextProvider)
