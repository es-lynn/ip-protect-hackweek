import crypto from 'crypto'

function generateTransactionId(): string {
  return crypto.randomBytes(6).toString('hex')
}

export { generateTransactionId }
