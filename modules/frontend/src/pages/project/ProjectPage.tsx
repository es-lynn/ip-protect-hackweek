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

import {
  ListResIpAddress,
  User,
  Webpage,
  WebpageListRes
} from '../../../lib/api/Api'
import { api } from '../../config/config'
import { withContext } from '../../hoc/withContext'
import { Modal } from '../../modal/ModalController'
import { nav } from '../../router/nav'
import { sp } from '../../styles/space'
import { MyButton, MyMenuItem } from './_components/MenuItem'
import { ProjectPageDeleteModal } from './_components/ProjectPageDeleteModal'
import { WebpageView } from './_components/WebpageView'
import {
  ProjectPageContext,
  ProjectPageContextProvider
} from './ProjectPage.context'

export const _ProjectPage = () => {
  const { webpages, users, ipAddresses, projectFriendlyId, deleteWebpage } =
    useContext(ProjectPageContext)

  const [segmentedButtonValue, setSegmentedButtonValue] =
    useState<string>('ip-address')

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

      {segmentedButtonValue === 'websites' && (
        <WebpageView
          webpages={webpages}
          projectFriendlyId={projectFriendlyId}
          deleteWebpage={deleteWebpage}
        />
      )}

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

export const ProjectPage = withContext(_ProjectPage, ProjectPageContextProvider)
