const initState = {
  projects: [],
  proxyInfoList: [],
  projectProxyList: [],
  finalizedValidator: [],
  proxyVotingInfoList: [],
  proxyVotingInfo: null,
  projectByAdmin: null,
  validatorRecentActivies: [],
  relatedPostsForMilestone: []
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
    case 'GET_BATCH_FINALIZED_VALIDATORS_FULFILLED':
      return {
        ...state,
        finalizedValidator: action.payload
      }
    case 'GET_BATCH_PROXY_VOTING_INFO_FULFILLED':
      return {
        ...state,
        proxyVotingInfoList: action.payload
      }
    case 'GET_PROXY_LIST_FOR_PROJECT_FULFILLED':
      return {
        ...state,
        projectProxyList: action.payload
      }
    case 'GET_VOTE_INFO_FULFILLED':
      for (let i = 0; i < state.proxyVotingInfoList.length; i++) {
        if (state.proxyVotingInfoList[i].projectId === action.payload.projectId) {
          state.proxyVotingInfoList.splice(i, 1, {
            ...action.payload
          })
        }
      }
      return {
        ...state,
        proxyVotingInfo: action.payload
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
    case 'GET_PROJECT_PAGE_DATA_FULFILLED': {
      return {
        ...state,
        ...action.payload.projectData
      }
    }
    case 'GET_PROJECT_BY_ADMIN_FULFILLED': {
      return {
        ...state,
        projectByAdmin: action.payload
      }
    }
    case 'GET_PROXY_INFO_LIST_FULFILLED': {
      return {
        ...state,
        proxyInfoList: action.payload
      }
    }

    case 'GET_VALIDATOR_RECENT_ACTIVITIES_FULFILLED': {
      return {
        ...state,
        validatorRecentActivies: action.payload
      }
    }
    case 'CLEAR_VALIDATOR_RECENT_ACTIVITIES': {
      return {
        ...state,
        validatorRecentActivies: []
      }
    }
    case 'GET_RELATED_POSTS_FOR_MILESTONE_FULFILLED': {
      return {
        ...state,
        relatedPostsForMilestone: action.payload
      }
    }
    default: // need this for default case
      return {
        ...state
      }
  }
}

export default projectReducer
