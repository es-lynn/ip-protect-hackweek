import { AlertDialog, Button, Text } from 'native-base'
import React from 'react'

import { AsyncButton } from '../../components/AsyncButton'
import { ModalControllerProps } from '../Modal.types'

export type ConfirmDialogProps = {
  title: string
  body: string
  onConfirm: () => Promise<void> | void
  onCancel?: () => void
  type: 'info' | 'success' | 'warning' | 'danger'
  modalController: ModalControllerProps
}
export const ConfirmDialog = ({
  title,
  body,
  onConfirm,
  onCancel,
  type,
  modalController
}: ConfirmDialogProps) => {
  return (
    <AlertDialog
      avoidKeyboard={false}
      closeOnOverlayClick={false}
      // FIXME
      key={new Date().getTime()}
      // FIXME
      leastDestructiveRef={{} as any}
      isOpen={modalController.visibility}
      onClose={modalController.close}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>
          <Text>{body}</Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={() => {
                onCancel?.()
                modalController.close()
              }}
            >
              Cancel
            </Button>
            <AsyncButton
              colorScheme={type}
              onPress={async () => {
                await onConfirm()
                modalController.close()
              }}
            >
              Delete
            </AsyncButton>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
