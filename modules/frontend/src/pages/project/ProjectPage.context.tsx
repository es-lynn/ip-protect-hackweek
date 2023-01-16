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
  WebpageAddBody,
  WebpageListRes
} from '../../../lib/api/Api'
import { api } from '../../config/config'
import { nav } from '../../router/nav'
import { sp } from '../../styles/space'
import { sleep } from '../../utils/util'

export interface ProjectPageContextType {
  ipAddresses?: IpAddress[]
  webpages?: Webpage[]
  users?: User[]
  projectFriendlyId: string

  deleteWebpage: (projectFriendlyId: string, webpageId: string) => Promise<void>
  addWebpage: (
    projectFriendlyId: string,
    webpage: { url: string; name: string }
  ) => Promise<void>

  deleteIpAddress: (
    projectFriendlyId: string,
    ipAddress: string
  ) => Promise<void>

  addIpAddress: (
    projectFriendlyId: string,
    ipAddress: { ip: string; tag: string }
  ) => Promise<void>
}

export const ProjectPageContext = createContext<ProjectPageContextType>(
  null as any
)
export const ProjectPageContextProvider = ({ children, route }: any) => {
  const projectFriendlyId = route.params.projectFriendlyId
  const [ipAddresses, setIpAddresses] = useState<ListResIpAddress[]>()
  const [webpages, setWebpages] = useState<Webpage[]>()
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    fetch()
  }, [])

  function fetch() {
    api.project
      .ipaddressList(projectFriendlyId)
      .then(data => setIpAddresses(data.data.ipAddresses))

    api.project
      .webpageList(projectFriendlyId)
      .then(data => setWebpages(data.data.webpages))

    api.project
      .userList(projectFriendlyId)
      .then(data => setUsers(data.data.users))
  }

  async function deleteWebpage(
    projectFriendlyId: string,
    webpageId: string
  ): Promise<void> {
    await api.project.webpageDelete(projectFriendlyId, webpageId)
    await api.project
      .webpageList(projectFriendlyId)
      .then(data => setWebpages(data.data.webpages))
  }

  async function addWebpage(
    projectFriendlyId: string,
    webpage: {
      url: string
      name: string
    }
  ): Promise<void> {
    await api.project.webpageAdd(projectFriendlyId, webpage)
    await api.project
      .webpageList(projectFriendlyId)
      .then(data => setWebpages(data.data.webpages))
  }

  async function deleteIpAddress(
    projectFriendlyId: string,
    ipAddress: string
  ): Promise<void> {
    await api.project.ipaddressRemove(projectFriendlyId, {
      ipAddress: ipAddress
    })
    await api.project
      .ipaddressList(projectFriendlyId)
      .then(data => setIpAddresses(data.data.ipAddresses))
  }

  async function addIpAddress(
    projectFriendlyId: string,
    ipAddress: {
      ip: string
      tag: string
    }
  ): Promise<void> {
    await api.project.ipaddressAdd(projectFriendlyId, {
      ip: ipAddress.ip,
      tag: ipAddress.tag
    })
    await api.project
      .ipaddressList(projectFriendlyId)
      .then(data => setIpAddresses(data.data.ipAddresses))
  }

  return (
    <ProjectPageContext.Provider
      value={{
        ipAddresses,
        webpages,
        users,
        projectFriendlyId,
        deleteWebpage,
        addWebpage,
        deleteIpAddress,
        addIpAddress
      }}
    >
      {children}
    </ProjectPageContext.Provider>
  )
}
