import * as projectApi from './apis'

const getProject = (projectId) => {
  return {
    type: 'GET_PROJECT',
    payload: projectApi.getProject(projectId)
  }
}

const getProjects = (limit = 20) => {
  return {
    type: 'GET_PROJECTS',
    payload: projectApi.getProjects(limit)
  }
}

const getProxyListForProject = (projectId, limit = 20) => {
  return {
    type: 'GET_PROXY_LIST_FOR_PROJECT',
    payload: projectApi.getProxyListForProject(projectId, limit)
  }
}

const getProxyInfoList = () => {
  return {
    type: 'GET_PROXY_INFO_LIST',
    payload: projectApi.getProxyInfoList()
  }
}

const getVoteInfo = (actor, projectId, limit = 20) => {
  return {
    type: 'GET_VOTE_INFO',
    payload: projectApi.getVoteInfo(actor, projectId, limit)
  }
}

const delegate = (projectId, actorList, pctList) => {
  return {
    type: 'DELEGATE',
    payload: projectApi.delegate(projectId, actorList, pctList)
  }
}

const getBatchFinalizedValidators = (MilestoneValidatorsInfoKeyList) => {
  return {
    type: 'GET_BATCH_FINALIZED_VALIDATORS',
    payload: projectApi.getBatchFinalizedValidators(MilestoneValidatorsInfoKeyList)
  }
}

const getBatchProxyVotingInfo = (ProxyVotingInfoKeyList) => {
  return {
    type: 'GET_BATCH_PROXY_VOTING_INFO',
    payload: projectApi.getBatchProxyVotingInfo(ProxyVotingInfoKeyList)
  }
}
const rateObjHelper = (privateKey, projectId, milestoneId, ratings, comment) => {
  return {
    type: 'RATE_OBJ',
    payload: projectApi.rateObj(privateKey, projectId, milestoneId, ratings, comment)
  }
}

const rateObj = (projectId, milestoneId, ratings, comment) => {
  return (dispatch, getState) => {
    const privateKey = getState().userReducer.profile.privateKey
    dispatch(rateObjHelper(privateKey, projectId, milestoneId, ratings, comment))
  }
}

const getProjectPageData = (actor) => {
  return {
    type: 'GET_PROJECT_PAGE_DATA',
    payload: projectApi.getProjectPageData(actor)
  }
}

const getProjectByAdmin = (actor) => {
  return {
    type: 'GET_PROJECT_BY_ADMIN',
    payload: projectApi.getProjectByAdmin(actor)
  }
}

const activateMilestone = (projectId, milestoneId) => {
  return {
    type: 'ACTIVATE_MILESTONE',
    payload: projectApi.activateMilestone(projectId, milestoneId)
  }
}

const finalizeMilestone = (projectId, milestoneId) => {
  return {
    type: 'FINALIZE_MILESTONE',
    payload: projectApi.finalizeMilestone(projectId, milestoneId)
  }
}

const removeMilestone = (projectId, milestoneId) => {
  return {
    type: 'REMOVE_MILESTONE',
    payload: projectApi.removeMilestone(projectId, milestoneId)
  }
}

const modifyMilestone = (projectId, milestoneId, content, commands, ids, contents) => {
  return {
    type: 'MODIFY_MILESTONE',
    payload: projectApi.modifyMilestone(projectId, milestoneId, content, commands, ids, contents)
  }
}

const addMilestone = (projectId, content, commands, ids, contents) => {
  return {
    type: 'ADD_MILESTONE',
    payload: projectApi.addMilestone(projectId, content, commands, ids, contents)
  }
}

const getValidatorRecentActivities = (actor, limit, cursor) => {
  return {
    type: 'GET_VALIDATOR_RECENT_ACTIVITIES',
    payload: projectApi.getValidatorRecentActivities(actor, limit, cursor)
  }
}

const clearValidatorRecentActivities = () => {
  return {
    type: 'CLEAR_VALIDATOR_RECENT_ACTIVITIES'
  }
}

export {
  getProjects,
  getProject,
  getProxyListForProject,
  getVoteInfo,
  delegate,
  rateObj,
  getBatchFinalizedValidators,
  getBatchProxyVotingInfo,
  getProjectPageData,
  getProjectByAdmin,
  activateMilestone,
  finalizeMilestone,
  removeMilestone,
  modifyMilestone,
  addMilestone,
  getProxyInfoList,
  getValidatorRecentActivities,
  clearValidatorRecentActivities
}
