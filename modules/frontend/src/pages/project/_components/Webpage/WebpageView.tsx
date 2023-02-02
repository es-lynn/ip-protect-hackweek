import { A } from '@expo/html-elements'
import { Button, Menu, Pressable, ThreeDotsIcon } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Webpage } from '../../../../../lib/api/Api'
import { Modal } from '../../../../modal/ModalController'
import { sp } from '../../../../styles/space'
import { ProjectPageDeleteModal } from './ProjectPageDeleteModal'
import { WebpageAddModal } from './WebpageAddModal'

export type WebpageViewProps = {
  webpages?: Webpage[]
  projectFriendlyId: string
  deleteWebpage: (projectFriendlyId: string, webpageId: string) => Promise<void>
  addWebpage: (projectFriendlyId: string, webpage: { url: string; name: string }) => Promise<void>
}
export const WebpageView = ({
  webpages,
  projectFriendlyId,
  deleteWebpage,
  addWebpage
}: WebpageViewProps) => {
  return (
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
                  <Text>{webpage.name}</Text>
                  <Text>{webpage.url}</Text>
                </View>
              </A>
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
                      Modal.confirm(props => (
                        <ProjectPageDeleteModal
                          projectFriendlyId={projectFriendlyId}
                          webpage={webpage}
                          onDelete={async () => await deleteWebpage(projectFriendlyId, webpage.id)}
                          {...props}
                        />
                      ))
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
      <Button
        onPress={() =>
          Modal.dialog(props => (
            <WebpageAddModal
              projectFriendlyId={projectFriendlyId}
              addWebpage={addWebpage}
              {...props}
            />
          ))
        }
      >
        Add Webpage
      </Button>
    </View>
  )
}
