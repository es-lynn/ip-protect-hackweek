import { CircleIcon, Menu, Pressable, ThreeDotsIcon } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList, TouchableHighlight, View } from 'react-native'
import { Text } from 'react-native-paper'

import { IpAddressWhitelistedRes, Project } from '../../../../../lib/api/Api'
import { api } from '../../../../config/config'
import { Modal } from '../../../../modal/ModalController'
import { nav } from '../../../../router/nav'
import { sp } from '../../../../styles/space'
import { ProjectEditDialog } from '../ProjectEditDialog'
import { WhitelistIndicator } from './WhitelistIndicator'

export type ProjectListViewProps = {
  projects: Project[]
  projectsWhitelist: Record<string, IpAddressWhitelistedRes>
}
export const ProjectListView = ({ projects, projectsWhitelist }: ProjectListViewProps) => {
  return (
    <View>
      {projects ? (
        <FlatList<Project>
          data={projects}
          renderItem={({ item: project }) => (
            <View
              key={project.id}
              style={{
                padding: sp._8,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <WhitelistIndicator
                isWhitelisted={projectsWhitelist[project.friendlyId]?.isWhitelisted}
              />
              <TouchableHighlight
                onPress={() =>
                  nav.navigate('project/:projectFriendlyId', {
                    projectFriendlyId: project.friendlyId
                  })
                }
              >
                <View style={{ flexDirection: 'column' }}>
                  <Text>{project.friendlyId}</Text>
                  <Text>{project.id}</Text>
                </View>
              </TouchableHighlight>
              <View style={{ marginLeft: 'auto' }}>
                <Menu
                  trigger={triggerProps => (
                    <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                      <ThreeDotsIcon />
                    </Pressable>
                  )}
                >
                  <Menu.Item
                    onPress={() =>
                      api.project.projectView(project.friendlyId).then(data => {
                        Modal.dialog(props => (
                          <ProjectEditDialog project={data.data.project} {...props} />
                        ))
                      })
                    }
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    onPress={() =>
                      Modal.confirm2({
                        type: 'danger',
                        title: 'Delete Project',
                        body: `Are you sure you wih to delete ${project.friendlyId}`,
                        onConfirm: async () => await api.project.projectDelete(project.friendlyId)
                      })
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              </View>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  )
}
