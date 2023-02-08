import { Button, Divider, FormControl, Heading, Input, Modal } from 'native-base'
import React from 'react'

import { AsyncButton } from '../../../components/AsyncButton'
import { api } from '../../../config/config'
import { useFormState } from '../../../hooks/useFormState'

type ProjectAddDialogProps<T> = {
  modal: { ok: (result?: T) => void; cancel: () => void }
}

export const ProjectAddDialog = ({ modal }: ProjectAddDialogProps<any>) => {
  const [project, setProject] = useFormState<{
    friendlyId: string
    awsAccessKey: string
    awsSecret: string
    ipSetId: string
    ipSetName: string
    ipSetRegion: string
    ipSetV6Id: string
    ipSetV6Name: string
    ipSetV6Region: string
  }>({
    friendlyId: '',
    awsAccessKey: '',
    awsSecret: '',
    ipSetId: '',
    ipSetName: '',
    ipSetRegion: '',
    ipSetV6Id: '',
    ipSetV6Name: '',
    ipSetV6Region: ''
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>Project</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>friendlyId</FormControl.Label>
          <Input onChangeText={text => setProject('friendlyId', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>AWS Access Key</FormControl.Label>
          <Input onChangeText={text => setProject('awsAccessKey', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>AWS Secret</FormControl.Label>
          <Input onChangeText={text => setProject('awsSecret', text)} />
        </FormControl>

        <Heading size="sm" mt={4}>
          IPv4
        </Heading>
        <FormControl mt="3">
          <FormControl.Label>IPSet ID</FormControl.Label>
          <Input onChangeText={text => setProject('ipSetId', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IPSet Name</FormControl.Label>
          <Input onChangeText={text => setProject('ipSetName', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IPSet Region</FormControl.Label>
          <Input onChangeText={text => setProject('ipSetRegion', text)} />
        </FormControl>

        <Heading size="sm" mt={4}>
          IPv6
        </Heading>
        <FormControl mt="3">
          <FormControl.Label>IPSet ID</FormControl.Label>
          <Input onChangeText={text => setProject('ipSetV6Id', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IPSet Name</FormControl.Label>
          <Input onChangeText={text => setProject('ipSetV6Name', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IPSet Region</FormControl.Label>
          <Input onChangeText={text => setProject('ipSetV6Region', text)} />
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={() => modal.cancel()}>
            Cancel
          </Button>
          <AsyncButton
            onPress={async () => {
              await api.project.projectCreate({
                friendlyId: project.friendlyId,
                awsAccessKey: project.awsAccessKey,
                awsSecret: project.awsSecret,
                ipType: 'ipv4', // TODO remove
                ipset: {
                  id: project.ipSetId,
                  name: project.ipSetName,
                  region: project.ipSetRegion
                },
                ipsetV6: {
                  id: project.ipSetV6Id,
                  name: project.ipSetV6Name,
                  region: project.ipSetV6Region
                }
              })
              await modal.ok()
            }}
          >
            Add
          </AsyncButton>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
