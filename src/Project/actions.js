import Milestone from '../Milestone.js'

async function _getProjects () {
  // generate mock data

  const projects = []

  for (let i = 1; i < 10; i++) {
    projects.push({
      projectId: '0xfa32a09875ec16eaab435100ea0ffd9a669d2d9c9a93240b687b5738ed7f040c',
      admin: '',
      milestoneInProgress: true,
      currMilestone: 0,
      milestonesCompleted: i % 10,
      numMilestones: 11,
      rating: (i * 5.5) % 51,
      content: {
        projectName: 'project #' + i,
        logo: '',
        wideLogo: 'https://icodrops.com/wp-content/uploads/2018/06/Haja-banner.jpg',
        shortDescription: 'Distributed and decentralized technologies for the future Internet, Distributed and decentralized technologies for the fNouture Internet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula. '
      }
    })
  }

  return projects
}

async function _getProject (projectId) {
  let milestone = new Milestone()
  let projectData = await milestone.getProject(projectId)
  let milestoneData = await milestone.getMilestones(projectId, projectData.numMilestones)
  projectData.milestones = milestoneData
  return projectData
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
