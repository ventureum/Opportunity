import * as api from './apis'

export function onLogin (loginData) {
  return {
    type: 'LOGIN_DATA_FETCHED',
    payload: loginData
  }
}

export function getProfile (username) {
  return (dispatch) => {
    return api.getProfile(username)
      .then((res) => {
        dispatch({
          type: 'PROFILE_DATA_FETCHED',
          payload: res.data.profile
        })
        return Promise.resolve(res)
      })
  }
}

export function getVoteList (username) {
  return (dispatch) => {
    api.getVoteList(username)
      .then((data) => {
        dispatch({
          type: 'VOTE_LIST_FETCHED',
          payload: data
        })
      })
  }
}

export function getPostList (username) {
  return (dispatch) => {
    api.getPostList(username)
      .then((data) => {
        dispatch({
          type: 'POST_LIST_FETCHED',
          payload: data
        })
      })
  }
}

export function getReplyList (username) {
  return (dispatch) => {
    api.getReplyList(username)
      .then((data) => {
        dispatch({
          type: 'REPLY_LIST_FETCHED',
          payload: data
        })
      })
  }
}

export function logout () {
  return {
    type: 'LOGOUT'
  }
}
