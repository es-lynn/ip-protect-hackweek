import axios from 'axios'

async function fetchIpAddress(): Promise<{
  ipv4: string
  ipv6?: string
}> {
  let ipv4: string
  let ipv6: string | undefined
  ipv4 = (await axios.get('https://4.ident.me/')).data
  try {
    ipv6 = (await axios.get('https://6.ident.me/')).data
  } catch (error) {
    console.warn('no IPv6 address available')
  }
  return {
    ipv4: ipv4,
    ipv6: ipv6
  }
}

export const identme = {
  fetchIpAddress
}
