const initState = {
  projects: []
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
    default: // need this for default case
      return state
  }
}

export default projectReducer
