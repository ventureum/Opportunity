import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from './ProjectComponent'
import { getProject } from './actions'

class ProjectContainer extends Component {
  componentDidMount () {
    let { match } = this.props
    if (match) {
      let projectId = match.params.projectId
      this.props.getProject(projectId)
    }
  }

  render () {
    let { projectData } = this.props
    return (<Project projectData={projectData} />)
  }
}

const mapStateToProps = state => {
  return {
    projectData: state.projectReducer.projectData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProject: (projectId) => dispatch(getProject(projectId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer)
