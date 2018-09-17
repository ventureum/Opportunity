const initState = {
  userInfo: {
    isAuthenticated: false
  },
  profile: null,
  voteList: null,
  postList: null,
  replyList: null
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'LOGIN_DATA_FETCHED':
      return {
        ...state,
        userInfo: action.payload
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
    default: // need this for default case
      return state
  }
}
