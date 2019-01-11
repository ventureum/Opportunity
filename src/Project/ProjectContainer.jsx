import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from './ProjectComponent'
import { getProject, rateObj, getProxyListForProject } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class ProjectContainer extends Component {
  componentDidMount () {
    let { match } = this.props
    if (match) {
      let projectId = match.params.projectId
      this.props.getProject(projectId)
      this.props.getProxyListForProject(projectId)
    }
  }

  render () {
    let { profile, projectData, projectProxyList, error, history, location, actionsPending } = this.props
    return (
      <Project
        profile={profile}
        projectData={projectData}
        projectProxyList={projectProxyList}
        error={error}
        history={history}
        location={location}
        actionsPending={actionsPending}
      />
    )
  }
}

const getProxyListForProjectLoadingSelector = createLoadingSelector(['GET_PROXY_LIST_FOR_PROJECT'])
const errorSelector = createErrorSelector(['GET_PROXY_LIST_FOR_PROJECT'])

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    projectData: state.projectReducer.projectData,
    projectProxyList: state.projectReducer.projectProxyList,
    actionsPending: {
      getProxyListForProject: getProxyListForProjectLoadingSelector(state)
    },
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProject: (projectId) => dispatch(getProject(projectId)),
    rateObj: (projectId, milestoneId, ratings, comment) => dispatch(rateObj(projectId, milestoneId, ratings, comment)),
    getProxyListForProject: (projectId, limit) => dispatch(getProxyListForProject(projectId, limit))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer)
