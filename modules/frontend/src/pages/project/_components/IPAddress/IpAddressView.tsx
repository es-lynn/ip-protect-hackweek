import { AddIcon, Badge, Box, Button, Divider, HStack, Spinner, Text, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { IpAddress, IpAddressWhitelistedRes } from '../../../../../lib/api/Api'
import { AppContext } from '../../../../App.context'
import { Modal } from '../../../../modal/ModalController'
import { CurrentIpView } from './CurrentIpView'
import { IpAddressAddDialog } from './IpAddressAddDialog'
import { OtherIpView } from './OtherIpView'

export type IpAddressViewProps = {
  ipAddresses?: IpAddress[]
  whitelistedV4?: IpAddressWhitelistedRes
  whitelistedV6?: IpAddressWhitelistedRes
  projectFriendlyId: string
  deleteIpAddress: (projectFriendlyId: string, ipAddress: string) => Promise<void>
  addIpAddress: (projectFriendlyId: string, ipAddress: { ip: string; tag: string }) => Promise<void>
}

// TODO: filter out current IP from others
export const IpAddressView = ({
  ipAddresses,
  projectFriendlyId,
  deleteIpAddress,
  addIpAddress,
  whitelistedV4,
  whitelistedV6
}: IpAddressViewProps) => {
  const { ipv4, ipv6 } = useContext(AppContext)
  const [otherAddresses, setOtherAddresses] = useState<IpAddress[]>()

  const matchingV4 = ipAddresses?.find(ip => ip.ip === ipv4)
  const matchingV6 = ipAddresses?.find(ip => ip.ip === ipv6)

  useEffect(() => {
    if (!ipAddresses) return
    setOtherAddresses(ipAddresses.filter(ip => ip.ip != ipv4 && ip.ip != ipv6))
  }, [ipAddresses])

  const openAddIpModal = (ip?: string, tag?: string) =>
    Modal.dialog(props => (
      <IpAddressAddDialog
        projectFriendlyId={projectFriendlyId}
        addIpAddress={addIpAddress}
        ipAddress={ip}
        tag={tag}
        {...props}
      />
    ))

  return (
    <View mt={2}>
      <Text mx={4} my={2} fontWeight={500} color="text.700" fontSize="sm">
        Current
      </Text>
      {ipv4 === undefined || ipv6 === undefined ? (
        <Spinner />
      ) : (
        <Box>
          <CurrentIpView
            ip={ipv4}
            isV6={false}
            isWhitelisted={!!matchingV4 || whitelistedV4?.isWhitelisted}
            name={matchingV4?.tag}
            onPressWhitelist={ip => openAddIpModal(ip)}
            whitelisted={whitelistedV4}
          />
          <Divider />
          <CurrentIpView
            ip={ipv6}
            isV6={true}
            isWhitelisted={!!matchingV6 || whitelistedV6?.isWhitelisted}
            name={matchingV6?.tag}
            onPressWhitelist={ip => openAddIpModal(ip)}
            whitelisted={whitelistedV6}
          />
        </Box>
      )}

      <HStack mx={4} mb={2} mt={6} space={2}>
        <Text fontWeight={500} color="text.700" fontSize="sm">
          Others
        </Text>
        <Badge rounded="full" variant="subtle" colorScheme="coolGray">
          {otherAddresses?.length ?? 0}
        </Badge>
      </HStack>
      {otherAddresses ? (
        <FlatList<IpAddress>
          data={otherAddresses}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <Text mx={4} my={2}>
              There are no other IP addresses
            </Text>
          )}
          renderItem={({ item: ipAddress }) => (
            <OtherIpView
              ip={ipAddress.ip}
              name={ipAddress.tag}
              synced={ipAddress['synced']}
              onDeleteIpAddress={async ip => await deleteIpAddress(projectFriendlyId, ip)}
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
        onPress={() => openAddIpModal()}
      >
        Add IP address
      </Button>
    </View>
  )
}
