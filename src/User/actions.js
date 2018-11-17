import Web3 from 'web3'
import delay from 'delay'
import * as api from './apis'
import { generatePrivateKey } from '../wallet'
import { getUUID, getRawUUID } from '../Utils'
import c from '../contract'

const userTypeMap = {
  'USER': '0x2db9fd3d',
  'KOL': '0xf4af7c06',
  'PF': '0x5707a2a6'
}

async function postTelegramLogin (loginData) {
  let uuid = getUUID(loginData.id)
  let rv = { userInfo: loginData, profile: {} }
  rv.userInfo.isAuthenticated = false

  try {
    // next, fetch user profile from our database
    let profile = await api.getProfile(uuid)
    rv.profile = profile
    rv.userInfo.newUser = false
    rv.userInfo.isAuthenticated = true
  } catch (err) {
    if (err.message && err.message.errorCode === 'NoActorExisting') {
      rv.userInfo.newUser = true
      return rv
    } else {
      // re-throw other errors
      throw err
    }
  }
  return rv
}

async function _register (userInfo) {
  try {
    // generate a new private key
    let { privateKey, address } = generatePrivateKey()
    privateKey = Web3.utils.bytesToHex(privateKey)
    let rawUUID = getRawUUID(userInfo.id)
    let user = address
    let userType = userTypeMap['USER']
    let reputation = 0
    let meta = {
      username: userInfo.username,
      photoUrl: userInfo.photo_url,
      telegramId: userInfo.id.toString(),
      phoneNumber: userInfo.phone_number
    }
    await c.start(privateKey)
    await c.registerUser(rawUUID, user, userType, reputation, JSON.stringify(meta))
    await c.disconnect()

    // successfully registered onchain
    // wait for database update, sleep for 2 seconds
    await delay(2000)

    // now, fetch user profile
    let uuid = getUUID(userInfo.id)

    let profile = await api.getProfile(uuid, false)

    // successfully retrieved profile, now register privateKey
    await api.setActorPrivateKey(uuid, privateKey)

    // set profile's privateKey manually
    profile.privateKey = privateKey

    return profile
  } catch (err) {
    throw err
  }
}

function register (userInfo) {
  return {
    type: 'REGISTER',
    payload: _register(userInfo)
  }
}

function onLogin (loginData) {
  return {
    type: 'FETCH_LOGIN_DATA',
    payload: postTelegramLogin(loginData)
  }
}

function addWallet (actor, walletAddress) {
  return {
    type: 'ADD_WALLET',
    payload: api.addWallet(actor, walletAddress)
  }
}

function removeWallet (actor, walletAddress) {
  return {
    type: 'REMOVE_WALLET',
    payload: api.removeWallet(actor, walletAddress)
  }
}

function getWallets (actor) {
  return {
    type: 'GET_WALLETS',
    payload: api.getWallets(actor)
  }
}

function getProfile (actor) {
  return {
    type: 'PROFILE_DATA',
    payload: api.getProfile(actor)
  }
}

function getBatchProfiles (actors) {
  return {
    type: 'GET_BATCH_PROFILES',
    payload: api.getBatchProfiles(actors)
  }
}

function getVoteList (actor) {
  return {
    type: 'VOTE_LIST',
    payload: api.getVoteList(actor)
  }
}

function getPostList (actor) {
  return {
    type: 'POST_LIST',
    payload: api.getPostList(actor)
  }
}

function getReplyList (actor) {
  return {
    type: 'REPLY_LIST',
    payload: api.getReplyList(actor)
  }
}

function logout () {
  return {
    type: 'LOGOUT'
  }
}

export { onLogin, logout, register, getWallets, getProfile, getBatchProfiles, getVoteList, getPostList, getReplyList, addWallet, removeWallet }
