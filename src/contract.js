import {
  NonceTxMiddleware, SignedTxMiddleware, Client, LocalAddress, LoomProvider, createJSONRPCClient, CryptoUtils
} from 'loom-js'

import Web3 from 'web3'
import RepSys from './contracts/RepSys.json'
import Milestone from './contracts/Milestone.json'

function getClient (privateKey, publicKey) {
  const writer = createJSONRPCClient({ protocols: [{ url: 'http://127.0.0.1:46658/rpc' }] })
  const reader = createJSONRPCClient({ protocols: [{ url: 'http://127.0.0.1:46658/query' }] })
  const client = new Client(
    'default',
    writer,
    reader
  )

  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]

  return client
}

export default class Contract {
  async createClient (privateKey) {
    privateKey = new Uint8Array(Web3.utils.hexToBytes(privateKey))
    let publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    this.from = LocalAddress.fromPublicKey(publicKey).toString()
    this.client = getClient(privateKey, publicKey)
    this.web3 = new Web3(new LoomProvider(this.client, privateKey))
    this.user = this.from
    this.client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
      this.disconnect()
      throw msg
    })
  }

  async disconnect () {
    await this.client.disconnect()
  }

  async _getCurrentNetwork () {
    return Promise.resolve('default')
  }

  async createContractInstance () {
    const networkId = await this._getCurrentNetwork()
    this.RepSysCurrentNetwork = RepSys.networks[networkId]
    this.MilestoneCurrentNetwork = Milestone.networks[networkId]

    if (!this.RepSysCurrentNetwork || !this.MilestoneCurrentNetwork) {
      throw Error('Contract not deployed on Loom')
    }

    const RepSysABI = RepSys.abi
    const MilestoneABI = Milestone.abi
    this.repSysInstance = new this.web3.eth.Contract(RepSysABI, this.RepSysCurrentNetwork.address, {
      from: this.user
    })
    this.milestoneInstance = new this.web3.eth.Contract(MilestoneABI, this.MilestoneCurrentNetwork.address, {
      from: this.user
    })
  }

  async start (privateKey) {
    await this.createClient(privateKey)
    await this.createContractInstance()
  }

  getUser () {
    return this.user
  }

  // RepSys functions
  async registerUser (uuid, user, userType, reputation = 0, meta) {
    return this.repSysInstance.methods.registerUser(
      uuid,
      user,
      userType,
      reputation,
      meta).send()
  }

  // milestone functions
  async rateObj (projectId, milestoneId, ratings, comment) {
    return this.milestoneInstance.methods.rateObj(projectId, milestoneId, ratings, comment).send()
  }
}
