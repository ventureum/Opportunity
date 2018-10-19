import { projectData, validators, voteInfo } from './mockData.js'
import axios from 'axios'

const endpoint = 'https://mfmybdhoea.execute-api.ca-central-1.amazonaws.com/beta'

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

async function _getProject (projectId) {
  let rv = await axios.post(endpoint + '/get-project', {
    projectId: projectId
  })
  return parseProject(rv.data.project)
}

async function _getProjects () {
  let rv = await axios.post(endpoint + '/get-project-list', {
    limit: 20,
    cursor: ''
  })
  return rv.data.projects.map(p => parseProject(p))
}

const getProject = (projectId) => {
  return {
    type: 'GET_PROJECT',
    payload: _getProject(projectId)
  }
}

const getProjects = () => {
  return {
    type: 'GET_PROJECTS',
    payload: _getProjects()
  }
}

const getValidators = () => {
  return {
    type: 'GET_VALIDATORS',
    payload: validators
  }
}

const getVoteInfo = () => {
  return {
    type: 'GET_VOTE_INFO',
    payload: voteInfo
  }
}

const vote = () => {
  return {
    type: 'VOTE',
    payload: Promise.resolve({})
  }
}

export { getProjects, getProject, getValidators, getVoteInfo, vote }
