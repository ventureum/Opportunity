import { CryptoUtils, LocalAddress } from 'loom-js'

function generatePrivateKey () {
  let privateKey = CryptoUtils.generatePrivateKey()
  let publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
  let address = LocalAddress.fromPublicKey(publicKey).toString()
  return { privateKey, publicKey, address }
}

export { generatePrivateKey }
