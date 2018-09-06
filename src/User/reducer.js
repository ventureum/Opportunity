const initState = {
  userInfo: {
    isAuthenticated: false
  }
}

export default function (state = initState, action) {
  switch (action.type) {
    case 'LOGIN_DATA_FETCHED':
      return {
        ...state,
        userInfo: action.payload
      }
    default: // need this for default case
      return state
  }
}
