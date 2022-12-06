import axios from 'axios'

async function fetchIpAddress(): Promise<{
  ipv4: string
  ipv6?: string
}> {
  const ipv4 = (await axios.get('https://api.ipify.org')).data
  const ipv4or6 = (await axios.get('https://api64.ipify.org')).data
  return {
    ipv4: ipv4,
    ipv6: ipv4 !== ipv4or6 ? ipv4or6 : undefined
  }
}

export const ipify = {
  fetchIpAddress
}
