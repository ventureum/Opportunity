import delay from 'delay'
import * as api from './apis'
import { generatePrivateKey } from '../wallet'
import Contract from '../contract'
const shake128 = require('js-sha3').shake128
const uuidParse = require('uuid-parse')

const userTypeMap = {
  'USER': '0x2db9fd3d',
  'KOL': '0xf4af7c06',
  'PF': '0x5707a2a6'
}

function getUUID (telegramId) {
  const shakeHash = shake128(String(telegramId), 128)
  const hashBytes = Buffer.from(shakeHash, 'hex')
  const id = uuidParse.unparse(hashBytes)
  return id
}

function getRawUUID (telegramId) {
  return '0x' + shake128(String(telegramId), 128)
}

async function postTelegramLogin (loginData) {
  let uuid = getUUID(loginData.id)
  let rv = { userInfo: loginData, profile: {} }
  rv.userInfo.isAuthenticated = false

  try {
    // next, fetch user profile from our database
    let { profile } = await api.getProfile(uuid)
    rv.profile = profile
    rv.userInfo.newUser = false
    rv.userInfo.isAuthenticated = true

    // fetch privateKey
    let { privateKey } = await api.getActorPrivateKey(uuid)
    rv.profile.privateKey = privateKey
  } catch (err) {
    if (err.message.errorCode === 'NoActorExisting') {
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

    let c = new Contract()
    await c.start(privateKey)
    await c.registerUser(rawUUID, user, userType, reputation, JSON.stringify(meta))
    await c.disconnect()

    // successfully registered onchain
    // wait for database update, sleep for 2 seconds
    await delay(2000)

    // now, fetch user profile
    let uuid = getUUID(userInfo.id)

    let { profile } = await api.getProfile(uuid)

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

export function getProfile (username) {
  return {
    type: 'PROFILE_DATA',
    payload: api.getProfile(username)
  }
}

export function getVoteList (username) {
  return {
    type: 'VOTE_LIST',
    payload: api.getVoteList(username)
  }
}

export function getPostList (username) {
  return {
    type: 'POST_LIST',
    payload: api.getPostList(username)
  }
}

export function getReplyList (username) {
  return {
    type: 'REPLY_LIST',
    payload: api.getReplyList(username)
  }
}

function logout () {
  return {
    type: 'LOGOUT'
  }
}

export { onLogin, logout, register }
