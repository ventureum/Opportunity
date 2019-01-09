import axios from 'axios'
import delay from 'delay'
import c from '../contract'
import * as userApi from '../User/apis'
import { encodeObjData } from '../Utils'

const baseUrl = `${process.env.REACT_APP_TCR_ENDPOINT}/${process.env.REACT_APP_TCR_STAGE}`

var apiTcr = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiTcr.interceptors.response.use(function (response) {
  if (!response.data.ok) {
    throw response.data
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

function parseObj (o) {
  o.content = JSON.parse(o.content)
  return o
}

function parseMilestone (m) {
  m.content = JSON.parse(m.content)
  if (m.objectives) {
    for (let i = 0; i < m.objectives.length; i++) {
      m.objectives[i] = parseObj(m.objectives[i])
    }
  }
  return m
}

function parseProject (p) {
  p.content = JSON.parse(p.content)
  if (p.milestonesInfo.milestones) {
    for (let i = 0; i < p.milestonesInfo.milestones.length; i++) {
      p.milestonesInfo.milestones[i] = parseMilestone(p.milestonesInfo.milestones[i])
    }
  }

  // complete missing entries
  if (!p.content.token.cantParticipate) {
    p.content.token.cantParticipate = []
  }

  return p
}

async function getProject (projectId) {
  let rv = await apiTcr.post('/get-project', {
    projectId: projectId
  })
  if (rv.data.ok) {
    return parseProject(rv.data.project)
  } else {
    let errorMsg = {
      NoProjectIdExisting: 'Project not exist'
    }
    throw errorMsg[rv.data.message.errorCode]
  }
}

async function getProjects (limit) {
  let rv = await apiTcr.post('/get-project-list', {
    limit,
    cursor: ''
  })
  return rv.data.responseData.projects ? rv.data.responseData.projects.map(p => parseProject(p)) : []
}

async function rateObj (privateKey, projectId, milestoneId, ratings, comment) {
  let ratingData = []
  for (var objId in ratings) {
    ratingData.push(objId)
    ratingData.push(ratings[objId])
  }

  await c.rateObj(projectId, milestoneId, ratingData, comment)
}

async function getProxyList (limit = 50, cursor = '') {
  const rv = await apiTcr.post('/get-proxy-list', { limit, cursor })
  if (rv.data.ok) {
    return rv.data.responseData
  } else {
    throw rv.data.message
  }
}

async function getProxyInfoList () {
  let proxyInfoList = []
  try {
    const globalProxies = await getProxyList()
    proxyInfoList = await userApi.getBatchProfiles(globalProxies.proxies)
    proxyInfoList = proxyInfoList.map(proxy => {
      let pc = {}
      try {
        pc = JSON.parse(proxy.profileContent)
      } catch (e) {
      }
      return {
        ...proxy,
        profileContent: pc
      }
    })
    return proxyInfoList
  } catch (e) {
    throw e
  }
}
async function getProxyListForProject (projectId, limit) {
  let rv = await apiTcr.post('/get-proxy-list', { limit })
  if (rv.data.responseData.proxies) {
    let proxyList = await userApi.getBatchProfiles(rv.data.responseData.proxies)
    proxyList = proxyList.map(proxy => {
      let pc = {}
      try {
        pc = JSON.parse(proxy.profileContent)
      } catch (e) {
      }
      return {
        ...proxy,
        profileContent: pc
      }
    })

    let ProxyVotingInfoKeyList = []
    rv.data.responseData.proxies.forEach(validator => {
      ProxyVotingInfoKeyList.push({
        actor: validator,
        projectId: projectId
      })
    })
    let proxyVotingInfo = await getBatchProxyVotingInfo(ProxyVotingInfoKeyList)
    proxyList.forEach((item, i) => {
      item.proxyVoting = proxyVotingInfo[i]
    })
    return proxyList
  } else {
    return []
  }
}

async function getVoteInfo (actor, projectId, limit) {
  let rv = await apiTcr.post('/get-proxy-voting-info', {
    actor,
    projectId,
    limit
  })
  return rv.data.responseData.proxyVotingInfo
}

async function delegate (projectId, actorList, pctList) {
  await c.delegate(projectId, actorList, pctList)
  await delay(2500)
}

async function getBatchFinalizedValidators (MilestoneValidatorsInfoKeyList) {
  let rv = await apiTcr.post('/get-batch-finalized-validators', {
    MilestoneValidatorsInfoKeyList
  })
  return rv.data.milestoneValidatorsInfoList
}

async function getBatchProxyVotingInfo (ProxyVotingInfoKeyList) {
  let rv = await apiTcr.post('/get-batch-proxy-voting-info', {
    ProxyVotingInfoKeyList
  })
  return rv.data.proxyVotingInfoList
}

async function getProjectPageData (actor) {
  let projects = await getProjects(Number.MAX_SAFE_INTEGER)
  let MilestoneValidatorsInfoKeyList = []
  let ProxyVotingInfoKeyList = []
  projects.forEach(project => {
    if (project.milestonesInfo && project.milestonesInfo.currentMilestone) {
      MilestoneValidatorsInfoKeyList.push({
        projectId: project.projectId,
        milestoneId: project.milestonesInfo.currentMilestone
      })
    }
    ProxyVotingInfoKeyList.push({
      actor: actor,
      projectId: project.projectId
    })
  })
  let finalizedValidators = []
  if (MilestoneValidatorsInfoKeyList.length > 0) {
    finalizedValidators = await getBatchFinalizedValidators(MilestoneValidatorsInfoKeyList)
  }
  let proxyVotingInfoList = (await getBatchProxyVotingInfo(ProxyVotingInfoKeyList)) || []
  let actors = []
  proxyVotingInfoList.forEach(votingInfo => votingInfo.proxyVotingList && votingInfo.proxyVotingList.slice(0, 4).forEach(proxy => actors.indexOf(proxy.proxy) < 0 && actors.push(proxy.proxy)))
  let profiles = await userApi.getBatchProfiles(actors)
  return {
    projectData: {
      projects,
      finalizedValidators,
      proxyVotingInfoList
    },
    userData: {
      profiles
    }
  }
}

async function getProjectByAdmin (actor) {
  let rv = await apiTcr.post('/get-project-id-by-admin', {
    admin: actor
  })
  if (rv.data.projectId) {
    let project = await getProject(rv.data.projectId)
    return project
  }
}

async function getValidatorRecentActivities (actor, limit = 20, cursor = '') {
  const rv = await apiTcr.post('/get-validator-recent-activities', {
    actor: actor,
    limit: limit,
    cursor: cursor
  })
  let ratingVoteActivities = []
  if (rv.data.responseData.ratingVoteActivities !== null) {
    ratingVoteActivities = rv.data.responseData.ratingVoteActivities
  }
  const projectInfoList = await Promise.all(ratingVoteActivities.map((activity) => {
    return getProject(activity.projectId)
  }))
  ratingVoteActivities = ratingVoteActivities.map((activity, i) => {
    return {
      ...activity,
      projectContent: projectInfoList[i].content,
      milestoneContent: projectInfoList[i].milestonesInfo.milestones[activity.milestoneId - 1].content
    }
  })
  return ratingVoteActivities
}

async function activateMilestone (projectId, milestoneId, startTime) {
  await c.activateMilestone(projectId, milestoneId, startTime)
  await delay(2000)
}

async function finalizeMilestone (projectId, milestoneId, endTime) {
  await c.finalizeMilestone(projectId, milestoneId, endTime)
  await delay(2000)
}

async function removeMilestone (projectId, milestoneId) {
  await c.removeMilestone(projectId, milestoneId)
  await delay(2000)
}

async function modifyMilestone (projectId, milestoneId, content, commands, ids, contents) {
  await c.modifyMilestone(projectId, milestoneId, JSON.stringify(content), encodeObjData(commands, ids, contents))
  await delay(2500)
}

async function addMilestone (projectId, content, commands, ids, contents) {
  await c.addMilestone(projectId, JSON.stringify(content), encodeObjData(commands, ids, contents))
  await delay(2500)
}

export {
  getProject,
  getProjects,
  rateObj,
  getProxyList,
  getProxyListForProject,
  getVoteInfo,
  delegate,
  getBatchFinalizedValidators,
  getBatchProxyVotingInfo,
  getProjectPageData,
  apiTcr,
  getProjectByAdmin,
  activateMilestone,
  finalizeMilestone,
  removeMilestone,
  modifyMilestone,
  addMilestone,
  getProxyInfoList,
  getValidatorRecentActivities
}
