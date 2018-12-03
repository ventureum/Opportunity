import Web3 from 'web3'
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

export function processError (requestStatus) {
  for (let name of Object.keys(requestStatus)) {
    if (name.endsWith('Error') && requestStatus[name]) {
      return requestStatus[name]
    }
  }
}

function toHexArray (byteArray) {
  return Array.prototype.map.call(byteArray, function (byte) {
    return '0x' + ('0' + (byte & 0xFF).toString(16)).slice(-2)
  })
}

export function encodeObjData (commands, ids, contents) {
  let objMetaCompact = []
  let objContent = []
  for (let i = 0; i < commands.length; i++) {
    let _command = commands[i]
    let _id = ids[i]
    let _content = contents[i]
    const encoder = new TextEncoder()
    const uint8array = encoder.encode(_content)
    let _contentLen = uint8array.length
    let _objMetaCompact = _command + _id * 10 + _contentLen * 10000
    let _objContent = toHexArray(uint8array)
    objMetaCompact.push(_objMetaCompact)
    objContent = objContent.concat(_objContent)
  }
  return { objMetaCompact: objMetaCompact, objContent: objContent }
}

export function decodeObjContent (encodedContent) {
  const decoder = new TextDecoder()
  return decoder.decode(new Uint8Array(Web3.utils.hexToBytes(encodedContent)))
}
