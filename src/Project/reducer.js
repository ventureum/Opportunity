const initState = {
  projects: [],
  validators: [],
  voteInfo: null
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_PROJECTS_FULFILLED':
      return {
        ...state,
        projects: action.payload
      }
    case 'GET_PROJECT_FULFILLED':
      return {
        ...state,
        projectData: action.payload
      }
    case 'GET_VALIDATORS':
      return {
        ...state,
        validators: action.payload
      }
    case 'GET_VOTE_INFO':
      return {
        ...state,
        voteInfo: action.payload
      }
    case 'RATE_OBJ_PENDING': {
      return {
        ...state,
        transactionPending: true
      }
    }
    case 'RATE_OBJ_FULFILLED': {
      return {
        ...state,
        transactionPending: false
      }
    }
    case 'RATE_OBJ_REJECTED': {
      return {
        ...state,
        transactionPending: false,
        error: action.payload
      }
    }
    default: // need this for default case
      return state
  }
}

export default projectReducer
