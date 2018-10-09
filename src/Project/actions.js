import { projectData } from './mockData.js'

async function _getProject (projectId) {
  return projectData
}

async function _getProjects () {
  let projects = []
  for (let i = 0; i < 10; i++) {
    let _p = await _getProject('mock id')
    projects.push(_p)
  }
  return projects
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

export { getProjects, getProject }
