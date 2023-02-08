import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, useEffect, useState } from 'react'

import { identme } from './services/identme'
import { ipify } from './services/ipify'
import { expandIPv6 } from './utils/ip.util'

export interface AppContextType {
  ipv4?: string | null
  ipv6?: string | null
}

export const AppContext = createContext<AppContextType>(null as any)
export const AppContextProvider = ({ children, route }: any) => {
  const [ipv4, setIpv4] = useState<string | null>()
  const [ipv6, setIpv6] = useState<string | null>()

  useEffect(() => {
    identme.fetchIpAddress().then(data => {
      setIpv4(data.ipv4 ?? null)
      if (data.ipv6) {
        setIpv6(expandIPv6(data.ipv6))
      } else {
        setIpv6(null)
      }
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        ipv4,
        ipv6
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
