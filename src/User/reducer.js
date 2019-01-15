import update from 'immutability-helper'

const initState = {
  userInfo: {
    isAuthenticated: false
  },
  wallets: [],
  profile: { username: 'Anonymous', actorType: 'ANONYMOUS' },
  profiles: [],
  finalizedValidators: [],
  voteList: [],
  postList: [],
  replyList: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'REGISTER_PENDING':
      return {
        ...state,
        transactionPending: true
      }
    case 'REGISTER_FULFILLED':
      let newState = update(state, { userInfo: { newUser: { $set: false } } })
      newState = update(state, { userInfo: { isAuthenticated: { $set: true } } })
      return {
        ...newState,
        profile: action.payload,
        transactionPending: false
      }
    case 'REGISTER_REJECTED':
      return {
        ...state,
        transactionPending: false,
        error: action.payload
      }
    case 'FETCH_LOGIN_DATA_FULFILLED':
      return {
        ...state,
        profile: action.payload.profile,
        userInfo: action.payload.userInfo
      }
    case 'GET_WALLETS_FULFILLED':
    case 'ADD_WALLET_FULFILLED':
    case 'REMOVE_WALLET_FULFILLED':
      return {
        ...state,
        wallets: action.payload
      }
    case 'GET_BATCH_PROFILES_FULFILLED':
      return {
        ...state,
        profiles: action.payload
      }
    case 'GET_PROJECT_PAGE_DATA_FULFILLED': {
      return {
        ...state,
        ...action.payload.userData
      }
    }
    case 'PROFILE_DATA_FULFILLED':
      return {
        ...state,
        profile: action.payload
      }
    case 'VOTE_LIST_FULFILLED':
      return {
        ...state,
        voteList: action.payload
      }
    case 'POST_LIST_FULFILLED':
      return {
        ...state,
        postList: action.payload
      }
    case 'REPLY_LIST_FULFILLED':
      return {
        ...state,
        replyList: action.payload
      }
    case 'LOGOUT':
      return {
        ...initState
      }
    case 'FETCH_ACCESS_TOKEN_FULFILLED':
      return {
        ...state,
        profile: action.payload.profile,
        userInfo: action.payload.userInfo
      }
    default: // need this for default case
      return state
  }
}
