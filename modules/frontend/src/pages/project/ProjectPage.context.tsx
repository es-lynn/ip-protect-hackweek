import React, { createContext, useContext, useEffect, useState } from 'react'

import {
  IpAddress,
  IpAddressWhitelistedRes,
  ListResIpAddress,
  Project3734,
  ProjectUser,
  Webpage
} from '../../../lib/api/Api'
import { AppContext } from '../../App.context'
import { Access } from '../../components/AccessStatusView'
import { api } from '../../config/config'
import { fromRole, Role } from '../../types/role'

export interface ProjectPageContextType {
  ipAddresses?: IpAddress[]
  webpages?: Webpage[]
  users?: ProjectUser[]
  projectFriendlyId: string
  whitelistedV4?: IpAddressWhitelistedRes
  whitelistedV6?: IpAddressWhitelistedRes
  access?: Access

  deleteWebpage: (projectFriendlyId: string, webpageId: string) => Promise<void>
  addWebpage: (projectFriendlyId: string, webpage: { url: string; name: string }) => Promise<void>

  deleteIpAddress: (projectFriendlyId: string, ipAddress: string) => Promise<void>
  addIpAddress: (projectFriendlyId: string, ipAddress: { ip: string; tag: string }) => Promise<void>

  editProjectUserRole: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
  addProjectUser: (projectFriendlyId: string, userId: string, role: Role) => Promise<void>
  removeProjectUser: (projectFriendlyId: string, userId: string) => Promise<void>

  createInviteLink: (projectFriendlyId: string, duration: number, email: string) => Promise<string>
}

export const ProjectPageContext = createContext<ProjectPageContextType>(null as any)
export const ProjectPageContextProvider = ({ children, route }: any) => {
  const { ipv4, ipv6 } = useContext(AppContext)
  const projectFriendlyId = route.params.projectFriendlyId
  const [ipAddresses, setIpAddresses] = useState<ListResIpAddress[]>()
  const [webpages, setWebpages] = useState<Webpage[]>()
  const [users, setUsers] = useState<ProjectUser[]>()
  const [whitelistedV4, setWhitelistedV4] = useState<IpAddressWhitelistedRes>()
  const [whitelistedV6, setWhitelistedV6] = useState<IpAddressWhitelistedRes>()
  const [access, setAccess] = useState<Access>()

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (ipv6) {
      api.project
        .ipaddressWhitelisted(projectFriendlyId, {
          ipAddress: ipv6
        })
        .then(data => setWhitelistedV6(data.data))
    } else if (ipv6 == null) {
      setWhitelistedV6({
        isWhitelisted: false
      })
    }
  }, [ipv6])

  useEffect(() => {
    if (ipv4) {
      api.project
        .ipaddressWhitelisted(projectFriendlyId, {
          ipAddress: ipv4
        })
        .then(data => setWhitelistedV4(data.data))
    } else if (ipv4 == null) {
      setWhitelistedV4({
        isWhitelisted: false
      })
    }
  }, [ipv4])

  useEffect(() => {
    if (whitelistedV4 === undefined || whitelistedV6 === undefined) return
    if (!whitelistedV4.isWhitelisted && !whitelistedV6.isWhitelisted) {
      setAccess('none')
    } else if (whitelistedV4.isWhitelisted && whitelistedV6.isWhitelisted) {
      setAccess('full')
    } else {
      setAccess('partial')
    }
  }, [whitelistedV4, whitelistedV6])

  function fetch(): void {
    api.project.ipaddressList(projectFriendlyId).then(data => setIpAddresses(data.data.ipAddresses))
    api.project.webpageList(projectFriendlyId).then(data => setWebpages(data.data.webpages))
    api.project.userList(projectFriendlyId).then(data => setUsers(data.data.users))
  }

  async function deleteWebpage(projectFriendlyId: string, webpageId: string): Promise<void> {
    await api.project.webpageDelete(projectFriendlyId, webpageId)
    await api.project.webpageList(projectFriendlyId).then(data => setWebpages(data.data.webpages))
  }

  async function addWebpage(
    projectFriendlyId: string,
    webpage: {
      url: string
      name: string
    }
  ): Promise<void> {
    await api.project.webpageAdd(projectFriendlyId, webpage)
    await api.project.webpageList(projectFriendlyId).then(data => setWebpages(data.data.webpages))
  }

  async function deleteIpAddress(projectFriendlyId: string, ipAddress: string): Promise<void> {
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

  async function editProjectUserRole(
    projectFriendlyId: string,
    userId: string,
    role: Role
  ): Promise<void> {
    await api.project.userRoleEdit(projectFriendlyId, userId, {
      isAdmin: fromRole(role)
    })
    api.project.userList(projectFriendlyId).then(data => setUsers(data.data.users))
  }

  async function addProjectUser(
    projectFriendlyId: string,
    userId: string,
    role: Role
  ): Promise<void> {
    await api.project.userAdd(projectFriendlyId, {
      id: userId,
      isAdmin: fromRole(role)
    })
    api.project.userList(projectFriendlyId).then(data => setUsers(data.data.users))
  }

  async function removeProjectUser(projectFriendlyId: string, userId: string): Promise<void> {
    await api.project.userRemove(projectFriendlyId, userId)
    api.project.userList(projectFriendlyId).then(data => setUsers(data.data.users))
  }

  async function createInviteLink(
    projectFriendlyId: string,
    expiresIn: number,
    email: string
  ): Promise<string> {
    const response = await api.project.invitationCreate(projectFriendlyId, {
      expiresIn: expiresIn,
      providerId: email
    })
    return response.data.url
  }

  return (
    <ProjectPageContext.Provider
      value={{
        ipAddresses,
        webpages,
        users,
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
      }}
    >
      {children}
    </ProjectPageContext.Provider>
  )
}
