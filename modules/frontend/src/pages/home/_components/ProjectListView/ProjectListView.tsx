import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { Text } from 'react-native-paper'

import { Project } from '../../../../../lib/api/Api'
import { nav } from '../../../../router/nav'
import { ProjectCard } from '../ProjectCard'

export type ProjectListViewProps = {
  projects?: Project[]
  // projectsWhitelist: Record<string, IpAddressWhitelistedRes> // TODO whitelist indicator
}
export const ProjectListView = ({ projects }: ProjectListViewProps) => {
  if (projects === undefined) return <ActivityIndicator size={'large'} />

  if (projects.length === 0) return <Text>You have no projects</Text>

  return (
    <FlatList<Project>
      data={projects}
      renderItem={({ item: project }) => (
        <ProjectCard
          name={project.friendlyId}
          access="none" // TODO whitelist indicator
          onPress={() =>
            nav.navigate('project/:projectFriendlyId', {
              projectFriendlyId: project.friendlyId
            })
          }
        />
      )}
    />
  )
}
