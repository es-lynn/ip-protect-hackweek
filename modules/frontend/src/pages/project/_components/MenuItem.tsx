import { Button, Menu } from 'native-base'
import React from 'react'

import { withLoading } from '../../../hoc/withLoading'

export const MyMenuItem = withLoading(Menu.Item, {
  asyncHandler: 'onPress'
})

export const MyButton = withLoading(Button, {
  asyncHandler: 'onPress'
})
