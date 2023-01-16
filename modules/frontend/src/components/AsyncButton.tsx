import { Button } from 'native-base'

import { withLoading } from '../hoc/withLoading'

export const AsyncButton = withLoading(Button, {
  asyncHandler: 'onPress',
  mapProps: {
    loading: 'isLoading',
    disabled: 'isDisabled'
  }
})
