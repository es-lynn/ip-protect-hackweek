import axios from 'axios'

async function fetchIpAddress(): Promise<{
  ipv4: string
  ipv6?: string
}> {
  const ipv4 = (await axios.get('https://4.ident.me/')).data
  const ipv4or6 = (await axios.get('https://6.ident.me/')).data
  return {
    ipv4: ipv4,
    ipv6: ipv4 !== ipv4or6 ? ipv4or6 : undefined
  }
}

export const identme = {
  fetchIpAddress
}
