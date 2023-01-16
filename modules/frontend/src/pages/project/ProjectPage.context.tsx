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
import React, { createContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native'
import { Chip, List, SegmentedButtons, Text } from 'react-native-paper'

import {
  IpAddress,
  ListResIpAddress,
  User,
  Webpage,
  WebpageListRes
} from '../../../lib/api/Api'
import { api } from '../../config/config'
import { nav } from '../../router/nav'
import { sp } from '../../styles/space'

export interface ProjectPageContextType {
  ipAddresses?: IpAddress[]
  webpages?: Webpage[]
  users?: User[]
  projectFriendlyId: string
}
export const ProjectPageContext = createContext<ProjectPageContextType>(
  null as any
)
// @ts-ignore
export const ProjectPageContextProvider = ({ children, route }) => {
  const projectFriendlyId = route.params.projectFriendlyId
  const [ipAddresses, setIpAddresses] = useState<ListResIpAddress[]>()
  const [webpages, setWebpages] = useState<Webpage[]>()
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    api.project
      .ipaddressList(projectFriendlyId)
      .then(data => setIpAddresses(data.data.ipAddresses))

    api.project
      .webpageList(projectFriendlyId)
      .then(data => setWebpages(data.data.webpages))

    api.project
      .userList(projectFriendlyId)
      .then(data => setUsers(data.data.users))
  }, [])

  return (
    <ProjectPageContext.Provider
      value={{
        ipAddresses,
        webpages,
        users,
        projectFriendlyId
      }}
    >
      {children}
    </ProjectPageContext.Provider>
  )
}
