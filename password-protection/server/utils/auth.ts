import { createHash, createHmac } from 'node:crypto'

/**
 * Create a signed token using HMAC
 */
export function signToken(data: string, secret: string): string {
  const hmac = createHmac('sha256', secret)
  hmac.update(data)
  return hmac.digest('hex')
}

/**
 * Verify a signed token
 */
export function verifyToken(data: string, signature: string, secret: string): boolean {
  const expectedSignature = signToken(data, secret)
  return expectedSignature === signature
}

/**
 * Hash password for comparison
 */
export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}
