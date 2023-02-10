import * as Clipboard from 'expo-clipboard'
import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Modal,
  Select,
  Text,
  VStack
} from 'native-base'
import React, { useState } from 'react'
import SvgQRCode from 'react-native-qrcode-svg'

import { AsyncButton } from '../../../../components/AsyncButton'
import { useFormState } from '../../../../hooks/useFormState'
import { throwToastAPIError } from '../../../../toast/Toast'

type UserAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
  projectFriendlyId: string
  createInviteLink: (projectFriendlyId: string, duration: number, email: string) => Promise<string>
}

export const InvitationCreateDialog = ({
  modal,
  projectFriendlyId,
  createInviteLink
}: UserAddDialogProps<any>) => {
  const [form, setForm] = useFormState<{
    duration: number
    email: string
  }>({
    duration: 3600,
    email: ''
  })

  const [url, setUrl] = useState<string>()
  const [copied, setCopied] = useState(false)

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>Create link</Modal.Header>
      <Modal.Body>
        {url ? (
          <VStack space={6}>
            <Text>Scan this QR code</Text>
            <Box alignSelf="center" borderColor="muted.200" borderWidth={2} rounded="xl" p={4}>
              <SvgQRCode value={url} size={160} />
            </Box>
            <Divider />
            <Text>Or share this invitation link.</Text>
            <HStack>
              <Input type="text" flexGrow={1} value={url} editable={false} />
              <Button
                flexShrink={0}
                variant="outline"
                onPress={() => {
                  Clipboard.setStringAsync(url)
                  setCopied(true)
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </HStack>
          </VStack>
        ) : (
          <FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={form.email}
                onChangeText={async text => {
                  setForm('email', text)
                }}
                placeholder="(optional) restrict link"
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Expires</FormControl.Label>
              <Select
                minWidth="200"
                _selectedItem={{ bg: 'teal.600' }}
                mt="1"
                selectedValue={form.duration.toString()}
                onValueChange={value => {
                  setForm('duration', Number.parseInt(value))
                }}
              >
                <Select.Item key={'1_hour'} label={'1 hour'} value={'3600'} />
                <Select.Item key={'1_day'} label={'1 day'} value={'86400'} />
                <Select.Item key={'1_week'} label={'1 week'} value={'604800'} />
              </Select>
            </FormControl>
          </FormControl>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          {url ? (
            <Button onPress={() => modal.cancel()}>Close</Button>
          ) : (
            <>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => modal.cancel()}>
                Cancel
              </Button>
              <AsyncButton
                onPress={async () => {
                  const url = await createInviteLink(
                    projectFriendlyId,
                    form.duration,
                    form.email
                  ).catch(throwToastAPIError)
                  setUrl(url)
                }}
              >
                Add
              </AsyncButton>
            </>
          )}
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
