import * as api from './apis'

export function onLogin (loginData) {
  return {
    type: 'LOGIN_DATA_FETCHED',
    payload: loginData
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

export function logout () {
  return {
    type: 'LOGOUT'
  }
}
