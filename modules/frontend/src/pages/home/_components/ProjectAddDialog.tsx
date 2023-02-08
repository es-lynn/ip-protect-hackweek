import { Button, FormControl, Input, Modal, Radio } from 'native-base'
import React from 'react'

import { AsyncButton } from '../../../components/AsyncButton'
import { api } from '../../../config/config'
import { useFormState } from '../../../hooks/useFormState'
import { IpType } from '../../../types/iptype'

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
    ipType: IpType
  }>({
    friendlyId: '',
    awsAccessKey: '',
    awsSecret: '',
    ipSetId: '',
    ipSetName: '',
    ipSetRegion: '',
    ipType: 'ipv4'
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
        <Radio.Group
          name={'ipType'}
          value={project.ipType}
          onChange={value => {
            setProject('ipType', value as IpType)
          }}
        >
          <Radio value="ipv4" my="1">
            IPv4
          </Radio>
          <Radio value="ipv6" my="1">
            IPv6
          </Radio>
        </Radio.Group>
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
                ipType: project.ipType,
                ipset: {
                  id: project.ipSetId,
                  name: project.ipSetName,
                  region: project.ipSetRegion
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
