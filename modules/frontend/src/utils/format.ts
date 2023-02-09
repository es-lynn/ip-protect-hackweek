function initials(name: string, maxLength: number = 2): string {
  const names = name.split(' ')
  const initials = names.map(n => n[0])
  return initials.slice(0, maxLength).join('')
}

export const format = { initials }
