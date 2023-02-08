import { Box, Spinner } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

import { Project } from '../../../../../lib/api/Api'
import { nav } from '../../../../router/nav'
import { ProjectAccessConsolidated } from '../../HomePage.context'
import { ProjectCard } from '../ProjectCard'

export type ProjectListViewProps = {
  projects?: Project[]
  projectAccess: ProjectAccessConsolidated
}
export const ProjectListView = ({ projects, projectAccess }: ProjectListViewProps) => {
  if (projects === undefined) return <Spinner size="lg" />

  if (projects.length === 0)
    return (
      <Box rounded="lg" shadow="2" p="4" backgroundColor="white" my="2">
        <Text>You have no projects</Text>
      </Box>
    )

  return (
    <FlatList<Project>
      data={projects}
      renderItem={({ item: project }) => (
        <ProjectCard
          name={project.friendlyId}
          access={projectAccess[project.friendlyId]}
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
