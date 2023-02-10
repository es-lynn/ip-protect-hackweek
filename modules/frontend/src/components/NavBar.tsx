import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Box, ChevronLeftIcon, HStack, IconButton, Spinner, Text } from 'native-base'
import React from 'react'

import { nav } from '../router/nav'
import { path } from '../router/route'
import { Access, AccessStatusView } from './AccessStatusView'

export const NavBar = (access?: Access) => (props: NativeStackHeaderProps) => {
  const titleSize = 'xl'

  return (
    <Box bg="primary.700" pt={4}>
      <HStack maxWidth={480} w="100%" alignSelf="center" alignItems="center" minHeight={10}>
        {props.options.headerBackVisible && (
          <IconButton
            icon={<ChevronLeftIcon color={props.options.headerTintColor} />}
            rounded="full"
            position="absolute"
            left={0}
            onPress={() => nav.navigate(path.home.index)}
          />
        )}
        <Text
          mx={4}
          textAlign={props.options.headerTitleAlign}
          fontSize={titleSize}
          fontWeight="500"
          flexGrow={1}
          color={props.options.headerTintColor}
        >
          {props.options.title ?? props.route.name}
        </Text>
        {props.options.headerRight && (
          <Box position="absolute" right={0}>
            {props.options.headerRight?.({
              canGoBack: props.navigation.canGoBack(),
              tintColor: props.options.headerTintColor
            })}
          </Box>
        )}
      </HStack>

      {props.options.headerBackVisible && // very hacky way to check if on "projects" page
        (access ? (
          <Box mb={6} rounded="full" bg="white:alpha.80" alignSelf="center" px={2}>
            <AccessStatusView access={access} />
          </Box>
        ) : (
          <Box height={42}>
            <Spinner size="sm" />
          </Box>
        ))}
    </Box>
  )
}
