import { Menu, Pressable, ThreeDotsIcon } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList, TouchableHighlight, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Project } from '../../../../lib/api/Api'
import { api } from '../../../config/config'
import { Modal } from '../../../modal/ModalController'
import { nav } from '../../../router/nav'
import { sp } from '../../../styles/space'
import { ProjectEditDialog } from './ProjectEditDialog'

export type ProjectListViewProps = {
  projects: Project[]
}
export const ProjectListView = ({ projects }: ProjectListViewProps) => {
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
