// Generates the JWT that Supabase needs as the "Secret Key (for OAuth)"
// in its Apple provider config. Apple requires a fresh JWT every 6 months.
//
// Usage:
//   node scripts/generate-apple-secret.mjs <p8-path> <team-id> <client-id>
//
// Example:
//   node scripts/generate-apple-secret.mjs ~/Downloads/AuthKey_ABC1234567.p8 25HQJ5M9V7 com.finnoybu.auth
//
// The Key ID is read from the .p8 filename (Apple names them AuthKey_<KEY_ID>.p8).
// Output is a single JWT string — paste it into Supabase Dashboard →
// Authentication → Providers → Apple → Secret Key (for OAuth).

import { createSign } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'

const [, , p8Path, teamId, clientId] = process.argv

if (!p8Path || !teamId || !clientId) {
  console.error('Usage: node scripts/generate-apple-secret.mjs <p8-path> <team-id> <client-id>')
  process.exit(1)
}

const keyIdMatch = basename(p8Path).match(/AuthKey_([A-Z0-9]+)\.p8$/i)
if (!keyIdMatch) {
  console.error('Could not extract Key ID from filename — expected AuthKey_<KEY_ID>.p8')
  process.exit(1)
}
const keyId = keyIdMatch[1]

const now = Math.floor(Date.now() / 1000)
const exp = now + 180 * 24 * 60 * 60 // ~6 months (Apple max)

const header = { alg: 'ES256', kid: keyId }
const payload = {
  iss: teamId,
  iat: now,
  exp,
  aud: 'https://appleid.apple.com',
  sub: clientId,
}

const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url')
const signingInput = `${b64url(header)}.${b64url(payload)}`
const signer = createSign('SHA256')
signer.update(signingInput)
signer.end()
const signature = signer
  .sign({ key: readFileSync(p8Path, 'utf8'), dsaEncoding: 'ieee-p1363' })
  .toString('base64url')

console.log(`${signingInput}.${signature}`)
console.error(`\nJWT generated. Expires: ${new Date(exp * 1000).toISOString()}`)
