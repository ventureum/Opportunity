const shake128 = require('js-sha3').shake128
const uuidParse = require('uuid-parse')

export function getUUID (telegramId) {
  const shakeHash = shake128(String(telegramId), 128)
  const hashBytes = Buffer.from(shakeHash, 'hex')
  const id = uuidParse.unparse(hashBytes)
  return id
}

export function getRawUUID (telegramId) {
  return '0x' + shake128(String(telegramId), 128)
}
