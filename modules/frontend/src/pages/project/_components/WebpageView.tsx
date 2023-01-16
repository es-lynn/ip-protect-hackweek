import { A } from '@expo/html-elements'
import { Menu, Pressable, ThreeDotsIcon } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Webpage } from '../../../../lib/api/Api'
import { Modal } from '../../../modal/ModalController'
import { sp } from '../../../styles/space'
import { MyMenuItem } from './MenuItem'
import { ProjectPageDeleteModal } from './ProjectPageDeleteModal'

export type WebpageViewProps = {
  webpages?: Webpage[]
  projectFriendlyId: string
  deleteWebpage: (projectFriendlyId: string, webpageId: string) => Promise<void>
}
export const WebpageView = ({
  webpages,
  projectFriendlyId,
  deleteWebpage
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
                  <MyMenuItem
                    onPress={() =>
                      Modal.dialog(props => (
                        <ProjectPageDeleteModal
                          projectFriendlyId={projectFriendlyId}
                          webpage={webpage}
                          onDelete={async () =>
                            await deleteWebpage(projectFriendlyId, webpage.id)
                          }
                          {...props}
                        />
                      ))
                    }
                  >
                    Delete
                  </MyMenuItem>
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
