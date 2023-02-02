/**
 * Just so nobody has to go through this hell again
 * IPv6 addresses can be compacted
 *   1. Leading 0s are removed
 *   2. Any block consisting of 1 or more occurences of ':0000:' are automatically shortened to '::'
 *     - 2a09:bac1:6560:0008:0000:0000:0023:025a -> 2a09:bac1:6560:8::23:25a
 */

export function expandIPv6(address: string): string {
  const numOfColons = (address.match(/:/g) || []).length
  const expandedWithZeros = address.replace(/::/, ':0000'.repeat(8 - numOfColons) + ':')
  const blocks = expandedWithZeros.split(':')
  const expandedBlock = blocks.map(it => {
    return '0'.repeat(4 - it.length) + it
  })
  return expandedBlock.join(':')
}

export function compactIPv6(address: string): string {
  const blocks = address.split(':')
  const shortBlocks = blocks.map(it => it.replace(/^0*/, ''))
  return shortBlocks.join(':').replace(/:{2,}/, '::')
}
