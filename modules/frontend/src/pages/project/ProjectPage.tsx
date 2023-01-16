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
import { nav } from '../../router/nav'
import { sp } from '../../styles/space'
import {
  ProjectPageContext,
  ProjectPageContextProvider
} from './ProjectPage.context'

export const _ProjectPage = () => {
  const { webpages, users, ipAddresses, projectFriendlyId } =
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
        <View>
          {webpages ? (
            <FlatList<Webpage>
              data={webpages}
              renderItem={({ item: webpage }) => (
                <View
                  key={webpage.id}
                  style={{
                    padding: sp._8,
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center'
                  }}
                >
                  <A href={webpage.url}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text>{webpage.url}</Text>
                      <Text>{webpage.name}</Text>
                    </View>
                  </A>
                  <View style={{ marginLeft: 'auto' }}>
                    <Menu
                      trigger={triggerProps => (
                        <Pressable
                          accessibilityLabel="More options menu"
                          {...triggerProps}
                        >
                          <ThreeDotsIcon />
                        </Pressable>
                      )}
                    >
                      <Menu.Item>Edit</Menu.Item>
                      <Menu.Item>Delete</Menu.Item>
                    </Menu>
                  </View>
                </View>
              )}
            />
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
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

      <View>
        <Button onPress={() => alert('hi')}>hello</Button>
      </View>
    </SafeAreaView>
  )
}

export const ProjectPage = withContext(_ProjectPage, ProjectPageContextProvider)
