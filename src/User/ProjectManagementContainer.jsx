import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectManagement from './ProjectManagementComponent'
import { getProjectByAdmin, activateMilestone, finalizeMilestone, removeMilestone, modifyMilestone, addMilestone } from '../Project/actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class ProjectManagementContainer extends Component {
  componentWillMount () {
    this.props.getProjectByAdmin(this.props.profile.actor)
  }

  componentDidUpdate (prevProps) {
    let checkList = [
      'addMilestone',
      'modifyMilestone',
      'activateMilestone',
      'finalizeMilestone',
      'removeMilestone'
    ]
    for (let name of checkList) {
      if (prevProps.actionsPending[name] && !this.props.actionsPending[name]) {
        this.props.getProjectByAdmin(this.props.profile.actor)
        break
      }
    }
  }

  render () {
    let {
      profile,
      projectByAdmin,
      actionsSuccess,
      actionsPending,
      error,
      getProjectByAdmin,
      activateMilestone,
      finalizeMilestone,
      removeMilestone,
      modifyMilestone,
      addMilestone
    } = this.props

    return (
      <ProjectManagement
        project={projectByAdmin}
        profile={profile}
        actionsSuccess={actionsSuccess}
        actionsPending={actionsPending}
        error={error}
        getProjectByAdmin={getProjectByAdmin}
        activateMilestone={activateMilestone}
        finalizeMilestone={finalizeMilestone}
        removeMilestone={removeMilestone}
        modifyMilestone={modifyMilestone}
        addMilestone={addMilestone}
      />
    )
  }
}

const getProjectByAdminLoadingSelector = createLoadingSelector(['GET_PROJECT_BY_ADMIN'])
const activateMilestoneLoadingSelector = createLoadingSelector(['ACTIVATE_MILESTONE'])
const finalizeMilestoneLoadingSelector = createLoadingSelector(['FINALIZE_MILESTONE'])
const removeMilestoneLoadingSelector = createLoadingSelector(['REMOVE_MILESTONE'])
const modifyMilestoneLoadingSelector = createLoadingSelector(['MODIFY_MILESTONE'])
const addMilestoneLoadingSelector = createLoadingSelector(['ADD_MILESTONE'])

const errorSelector = createErrorSelector(
  ['GET_PROJECT_BY_ADMIN',
    'ACTIVATE_MILESTONE',
    'FINALIZE_MILESTONE',
    'REMOVE_MILESTONE',
    'MODIFY_MILESTONE',
    'ADD_MILESTONE'])

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    projectByAdmin: state.projectReducer.projectByAdmin,
    actionsPending: {
      getProjectByAdmin: getProjectByAdminLoadingSelector(state),
      activateMilestone: activateMilestoneLoadingSelector(state),
      finalizeMilestone: finalizeMilestoneLoadingSelector(state),
      removeMilestone: removeMilestoneLoadingSelector(state),
      modifyMilestone: modifyMilestoneLoadingSelector(state),
      addMilestone: addMilestoneLoadingSelector(state)
    },
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectByAdmin: (actor) => dispatch(getProjectByAdmin(actor)),
    activateMilestone: (projectId, milestoneId) => dispatch(activateMilestone(projectId, milestoneId)),
    finalizeMilestone: (projectId, milestoneId) => dispatch(finalizeMilestone(projectId, milestoneId)),
    removeMilestone: (projectId, milestoneId) => dispatch(removeMilestone(projectId, milestoneId)),
    modifyMilestone: (projectId, milestoneId, content, commands, ids, contents) => dispatch(modifyMilestone(projectId, milestoneId, content, commands, ids, contents)),
    addMilestone: (projectId, content, commands, ids, contents) => dispatch(addMilestone(projectId, content, commands, ids, contents))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectManagementContainer)
