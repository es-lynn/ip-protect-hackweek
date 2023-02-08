import React, { createContext, useEffect, useState } from 'react'

import { Project } from '../../../lib/api/Api'
import { Access } from '../../components/AccessStatusView'
import { api } from '../../config/config'
import { nav } from '../../router/nav'
import { throwToastError } from '../../toast/Toast'

interface ProjectAccessStatus {
  [projectId: string]: boolean
}

export interface ProjectAccessConsolidated {
  [projectId: string]: Access | undefined
}

export interface HomePageContextType {
  projects?: Project[]
  projectsAccess: ProjectAccessConsolidated
}

export const HomePageContext = createContext<HomePageContextType>(null as any)
export const HomePageContextProvider = ({ children, route }: any) => {
  const [projects, setProjects] = useState<Project[]>()
  const [projectsAccess, setProjectsAccess] = useState<ProjectAccessConsolidated>({})

  useEffect(() => {
    fetch()
  }, [])

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

  useEffect(() => {
    // TODO actually determine access for each project
    if (!projects) return
    const access = Object.fromEntries(
      projects.map((p: Project): [string, Access | undefined] => {
        return [p.friendlyId, undefined]
      })
    )
    setProjectsAccess(access)
  }, [projects])

  function fetch(): void {
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
  }

  return (
    <HomePageContext.Provider
      value={{
        projects,
        projectsAccess
      }}
    >
      {children}
    </HomePageContext.Provider>
  )
}
