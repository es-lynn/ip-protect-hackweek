import { Button, Menu, Pressable, ThreeDotsIcon, WarningIcon } from 'native-base'
import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'

import { IpAddress } from '../../../../../lib/api/Api'
import { Modal } from '../../../../modal/ModalController'
import { sp } from '../../../../styles/space'
import { IpAddressAddDialog } from './IpAddressAddDialog'

export type IpAddressViewProps = {
  ipAddresses?: IpAddress[]
  projectFriendlyId: string
  deleteIpAddress: (projectFriendlyId: string, ipAddress: string) => Promise<void>
  addIpAddress: (projectFriendlyId: string, ipAddress: { ip: string; tag: string }) => Promise<void>
}
export const IpAddressView = ({
  ipAddresses,
  projectFriendlyId,
  deleteIpAddress,
  addIpAddress
}: IpAddressViewProps) => {
  return (
    <View>
      {ipAddresses ? (
        <FlatList<IpAddress>
          data={ipAddresses}
          renderItem={({ item: ipAddress }) => (
            <View
              key={ipAddress.id}
              style={{
                padding: sp._8,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center'
              }}
            >
              {!ipAddress['synced'] && <WarningIcon />}
              <View style={{ flexDirection: 'column', marginLeft: sp._8 }}>
                <Text>{ipAddress.tag}</Text>
                <Text>{ipAddress.ip}</Text>
              </View>
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
                      Modal.confirm2({
                        title: 'Delete IP Address',
                        body: `Are you sure you wish to delete ${ipAddress.tag}?`,
                        type: 'danger',
                        onConfirm: async () =>
                          await deleteIpAddress(projectFriendlyId, ipAddress.ip)
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
      <Button
        onPress={() =>
          Modal.dialog(props => (
            <IpAddressAddDialog
              projectFriendlyId={projectFriendlyId}
              addIpAddress={addIpAddress}
              {...props}
            />
          ))
        }
      >
        Add IP Address
      </Button>
    </View>
  )
}
