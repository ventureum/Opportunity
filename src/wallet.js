import { CryptoUtils, LocalAddress } from 'loom-js'

export default class Wallet {
  static setupPrivateKey (privateKey) {
    if (!privateKey) {
      this.privateKey = CryptoUtils.generatePrivateKey()
    } else {
      this.privateKey = privateKey
    }

    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey)
    this.from = LocalAddress.fromPublicKey(this.publicKey).toString()
  }
}
