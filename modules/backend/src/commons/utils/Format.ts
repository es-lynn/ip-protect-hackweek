function json(object: Object): string {
  return JSON.stringify(object, null, 2)
}

function mask(password: string): string {
  let maskedPassword = ''
  for (let i = 0; i < password.length; i++) {
    maskedPassword += '*'
  }
  return maskedPassword
}

export const Format = {
  json,
  mask
}
