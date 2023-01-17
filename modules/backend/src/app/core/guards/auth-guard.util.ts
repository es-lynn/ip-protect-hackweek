export function parseUid(uid: string): [string, string] {
  const provider = uid.split('|')[0]
  const providerId = uid.split('|')[1]
  if (`${provider}|${providerId}` !== uid) {
    throw Error(`Invalid uid: ${uid}`)
  }
  return [provider, providerId]
}
