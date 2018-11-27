import axios from 'axios'
import delay from 'delay'
import c from '../contract'
import * as userApi from '../User/apis'

const baseUrl = 'https://mfmybdhoea.execute-api.ca-central-1.amazonaws.com/exp'

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

async function getProxyList (projectId, limit) {
  let rv = await apiTcr.post('/get-proxy-list', { limit })
  if (rv.data.responseData.proxies) {
    let proxyList = await userApi.getBatchProfiles(rv.data.responseData.proxies)
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

export { getProject, getProjects, rateObj, getProxyList, getVoteInfo, delegate, getBatchFinalizedValidators, getBatchProxyVotingInfo, getProjectPageData, apiTcr }
