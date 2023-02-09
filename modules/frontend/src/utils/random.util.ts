export function generateRandomNumber(word: string): number {
  return word
    .split('')
    .map(char => char.charCodeAt(0))
    .reduce((acc, curr) => acc + curr, 0)
}
