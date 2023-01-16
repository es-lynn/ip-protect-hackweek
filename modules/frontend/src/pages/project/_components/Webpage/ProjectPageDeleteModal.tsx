import { AlertDialog, Button, Text } from 'native-base'
import React, { useContext } from 'react'

import { Project, Webpage } from '../../../../../lib/api/Api'
import { AsyncButton } from '../../../../components/AsyncButton'
import { withContext } from '../../../../hoc/withContext'
import { sleep } from '../../../../utils/util'
import {
  ProjectPageContext,
  ProjectPageContextProvider
} from '../../ProjectPage.context'

type ProjectPageDeleteModalProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
  webpage: Webpage
  onDelete: () => Promise<void>
}
export const ProjectPageDeleteModal = ({
  modal,
  projectFriendlyId,
  webpage,
  onDelete
}: ProjectPageDeleteModalProps<any>) => {
  return (
    <AlertDialog.Content>
      <AlertDialog.CloseButton />
      <AlertDialog.Header>Delete Webpage</AlertDialog.Header>
      <AlertDialog.Body>
        <Text>
          This will remove {webpage.name} ({webpage.url}) from the project:{' '}
          {projectFriendlyId}
        </Text>
      </AlertDialog.Body>
      <AlertDialog.Footer>
        <Button.Group space={2}>
          <Button
            variant="unstyled"
            colorScheme="coolGray"
            onPress={() => modal.cancel()}
          >
            Cancel
          </Button>
          <AsyncButton
            colorScheme="danger"
            onPress={async () => {
              await onDelete()
              modal.ok()
            }}
          >
            Delete
          </AsyncButton>
        </Button.Group>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  )
}
