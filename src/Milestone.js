import Utils from './utils'

export default class Milestone {
  constructor () {
    this.instance = Utils._milestone
  }

  async getProject (projectId) {
    let rv = await this.instance.methods.getProject(projectId).call()
    return {
      projectId: projectId,
      admin: rv[0],
      content: JSON.parse(rv[1]),
      currMilestone: Number(rv[2]),
      milestonesCompleted: Number(rv[3]),
      numMilestones: Number(rv[4]),
      rating: 48 // mock rating
    }
  }

  async getObj (projectId, milestoneId, objId) {
    let rv = await this.instance.methods.getObj(projectId, milestoneId, objId).call()
    return {
      id: objId,
      exist: rv[0],
      content: rv[1],
      totalScore: Number(rv[2]),
      totalWeight: Number(rv[3])
    }
  }

  async getObjs (projectId, milestoneId, len) {
    let objs = []
    for (let i = 0; i < len; i++) {
      let _o = await this.getObj(projectId, milestoneId, i)
      if (_o.exist) {
        objs.push(_o)
      }
    }
    return objs
  }

  getMilestoneState (milestone) {
    if (milestone.exist) {
      if (milestone.startTime > 0) {
        if (milestone.endTime > 0) {
          return 'COMPLETE'
        } else {
          return 'IN_PROGRESS'
        }
      } else {
        return 'PENDING'
      }
    } else {
      return 'NONEXISTENCE'
    }
  }

  async getMilestone (projectId, milestoneId) {
    let rv = await this.instance.methods.getMilestone(projectId, milestoneId).call()
    let _m = {
      id: milestoneId,
      exist: rv[0],
      content: JSON.parse(rv[1]),
      startTime: Number(rv[2]),
      endTime: Number(rv[3]),
      numObjs: Number(rv[4]),
      rating: (1 + milestoneId * 5.5) % 51 // mock rating
    }

    let state = this.getMilestoneState(_m)
    _m.state = state
    return _m
  }

  async getMilestones (projectId, len) {
    let milestones = []
    for (let i = 0; i < len; i++) {
      let _m = await this.getMilestone(projectId, i)
      // check if it exists
      if (_m.exist) {
        _m.objs = await this.getObjs(projectId, _m.id, _m.numObjs)
        milestones.push(_m)
      }
    }
    return milestones
  }
}
