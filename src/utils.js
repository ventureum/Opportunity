import {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Address, LocalAddress, CryptoUtils, LoomProvider, EvmContract
} from 'loom-js'

import Web3 from 'web3'
import MilestoneJson from './contracts/Milestone.json'
import RepSysJson from './contracts/RepSys.json'

function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46658/websocket',
    'ws://127.0.0.1:46658/queryws',
  )

  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]

  return client
}

export default class Utils {
  static async init () {
    const privateKey = CryptoUtils.generatePrivateKey()
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = getClient(privateKey, publicKey)
    const from = LocalAddress.fromPublicKey(publicKey).toString()
    const loomProvider = new LoomProvider(client, privateKey)
    this.web3 = new Web3(loomProvider)
    this.user = from
    console.log(this.user)

    client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })

    let milestoneAddress = MilestoneJson.networks['default'].address
    let repSysAddress = RepSysJson.networks['default'].address

    this._milestone = new this.web3.eth.Contract(MilestoneJson.abi, milestoneAddress, { from })
    this._repSys = new this.web3.eth.Contract(RepSysJson.abi, repSysAddress, { from })
  }
}
