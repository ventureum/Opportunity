import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from './ProjectComponent'
import { getProject, rateObj } from './actions'

class ProjectContainer extends Component {
  constructor () {
    super()
    this.state = {
      error: ''
    }
  }

  async componentDidMount () {
    let { match } = this.props
    if (match) {
      let projectId = match.params.projectId
      try {
        await this.props.getProject(projectId)
      } catch (e) {
        this.setState({
          error: e
        })
      }
    }
  }

  render () {
    let { profile, projectData, ...other } = this.props
    let { error } = this.state
    return (<Project profile={profile} projectData={projectData} error={error} {...other} />)
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    projectData: state.projectReducer.projectData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProject: (projectId) => dispatch(getProject(projectId)),
    rateObj: (projectId, milestoneId, ratings, comment) => dispatch(rateObj(projectId, milestoneId, ratings, comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer)
