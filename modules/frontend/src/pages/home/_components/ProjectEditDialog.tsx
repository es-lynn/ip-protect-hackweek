import { Button, FormControl, Input, Modal, Radio } from 'native-base'
import React from 'react'

import { Project3734 } from '../../../../lib/api/Api'
import { AsyncButton } from '../../../components/AsyncButton'
import { api } from '../../../config/config'
import { useFormState } from '../../../hooks/useFormState'
import { IpType } from '../../../types/iptype'

type ProjectEditDialogProps<T> = {
  project: Project3734
  modal: { ok: (result?: T) => void; cancel: () => void }
}

export const ProjectEditDialog = ({ modal, project }: ProjectEditDialogProps<any>) => {
  const [form, setForm] = useFormState<{
    friendlyId: string
    awsAccessKey: string
    awsSecret: string
    ipSetId: string
    ipSetName: string
    ipSetRegion: string
    ipType: IpType
  }>({
    friendlyId: project.friendlyId,
    awsAccessKey: project.awsAccessKey,
    awsSecret: project.awsSecret,
    ipSetId: project.ipset.id,
    ipSetName: project.ipset.name,
    ipSetRegion: project.ipset.region,
    ipType: project.ipType
  })

  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>{form.friendlyId}</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>friendlyId</FormControl.Label>
          <Input value={form.friendlyId} onChangeText={text => setForm('friendlyId', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>AWS Access Key</FormControl.Label>
          <Input value={form.awsAccessKey} onChangeText={text => setForm('awsAccessKey', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>AWS Secret</FormControl.Label>
          <Input value={form.awsSecret} onChangeText={text => setForm('awsSecret', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IPSet ID</FormControl.Label>
          <Input value={form.ipSetId} onChangeText={text => setForm('ipSetId', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IPSet Name</FormControl.Label>
          <Input value={form.ipSetName} onChangeText={text => setForm('ipSetName', text)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>IPSet Region</FormControl.Label>
          <Input value={form.ipSetRegion} onChangeText={text => setForm('ipSetRegion', text)} />
        </FormControl>
        <Radio.Group
          name={'ipType'}
          value={form.ipType}
          onChange={value => {
            setForm('ipType', value as IpType)
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
              await api.project.projectEdit(project.friendlyId, {
                friendlyId: form.friendlyId,
                awsAccessKey: form.awsAccessKey,
                awsSecret: form.awsSecret.includes('*') ? undefined : form.awsSecret,
                ipType: form.ipType,
                ipset: {
                  id: form.ipSetId,
                  name: form.ipSetName,
                  region: form.ipSetRegion
                }
              })
              await modal.ok()
            }}
          >
            Edit
          </AsyncButton>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  )
}
