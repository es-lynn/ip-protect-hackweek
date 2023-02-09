import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, useEffect, useState } from 'react'

import { User } from '../lib/api/Api'
import { api } from './config/config'
import { identme } from './services/identme'
import { expandIPv6 } from './utils/ip.util'

export interface AppContextType {
  ipv4?: string | null
  ipv6?: string | null
  me?: User
}

export const AppContext = createContext<AppContextType>(null as any)
export const AppContextProvider = ({ children, route }: any) => {
  const [ipv4, setIpv4] = useState<string | null>()
  const [ipv6, setIpv6] = useState<string | null>()
  const [me, setMe] = useState<User>()

  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    identme.fetchIpAddress().then(
      data => {
        setIpv4(data.ipv4 ?? null)
        if (data.ipv6) {
          setIpv6(expandIPv6(data.ipv6))
        } else {
          setIpv6(null)
        }
      },
      () => {
        setIpv4(null)
        setIpv6(null)
      }
    )
  }, [])

  useEffect(() => {
    setTimeout(() => {
      api.me.meIndex().then(data => setMe(data.data.user))
    }, 1000)
  }, [isAuthenticated])

  return (
    <AppContext.Provider
      value={{
        ipv4,
        ipv6,
        me
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
