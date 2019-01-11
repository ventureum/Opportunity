import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectList from './ProjectListComponent'
import { getProjects } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class ProjectListContainer extends Component {
  componentWillMount () {
    this.props.getProjects()
  }

  render () {
    let { projects, history, location, actionsPending } = this.props
    return (
      <ProjectList
        projects={projects}
        history={history}
        location={location}
        actionsPending={actionsPending}
      />
    )
  }
}
const getProjectsLoadingSelector = createLoadingSelector(['GET_PROJECTS'])
const errorSelector = createErrorSelector(['GET_PROJECTS'])

const mapStateToProps = state => {
  return {
    projects: state.projectReducer.projects,
    actionsPending: {
      getProjects: getProjectsLoadingSelector(state)
    },
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => dispatch(getProjects())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListContainer)
