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
    case 'PROFILE_DATA_FETCHED':
      return {
        ...state,
        profile: action.payload
      }
    case 'VOTE_LIST_FETCHED':
      return {
        ...state,
        voteList: action.payload
      }
    case 'POST_LIST_FETCHED':
      return {
        ...state,
        postList: action.payload
      }
    case 'REPLY_LIST_FETCHED':
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
