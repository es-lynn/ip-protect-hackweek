import { CircleIcon } from 'native-base'
import React from 'react'

export type WhitelistIndicatorProps = {
  isWhitelisted?: boolean
}
export const WhitelistIndicator = ({ isWhitelisted }: WhitelistIndicatorProps) => {
  if (isWhitelisted === false) {
    return <CircleIcon style={{ color: 'red' }} />
  } else if (isWhitelisted === true) {
    return <CircleIcon style={{ color: 'green' }} />
  }
  return <></>
}
