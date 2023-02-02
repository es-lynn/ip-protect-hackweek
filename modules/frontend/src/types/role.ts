export type Role = 'admin' | 'user'

export function toRole(isAdmin: boolean): Role {
  return isAdmin ? 'admin' : 'user'
}

export function fromRole(role: Role): boolean {
  return role === 'admin'
}

export function parseRole(value: unknown): Role {
  if (value === 'admin' || value === 'user') {
    return value
  }
  throw TypeError(`Invalid value for type Role. Received ${value}`)
}
