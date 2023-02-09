import { AddIcon, Button, Center, Divider, Spinner, Text, VStack } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'

import { Webpage } from '../../../../../lib/api/Api'
import { Modal } from '../../../../modal/ModalController'
import { WebpageAddModal } from './WebpageAddModal'
import { WebpageRowView } from './WebpageRowView'

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
    <VStack>
      {webpages ? (
        <FlatList<Webpage>
          data={webpages}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <Center mx={4} my={6}>
              <Text>There are no websites in this project</Text>
            </Center>
          )}
          renderItem={({ item: webpage }) => (
            <WebpageRowView
              webpage={webpage}
              canEdit={true}
              onPressDelete={() =>
                Modal.confirm2({
                  title: 'Delete Webpage',
                  body: `This will remove ${webpage.name} (${webpage.url}) from the project: ${projectFriendlyId}`,
                  type: 'danger',
                  onConfirm: async () => await deleteWebpage(projectFriendlyId, webpage.id)
                })
              }
            />
          )}
        />
      ) : (
        <Spinner />
      )}

      <Button
        m={6}
        leftIcon={<AddIcon />}
        alignSelf="start"
        variant="outline"
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
        Add Website
      </Button>
    </VStack>
  )
}
