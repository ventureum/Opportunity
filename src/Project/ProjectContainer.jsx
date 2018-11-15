import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from './ProjectComponent'
import { getProject, rateObj } from './actions'

class ProjectContainer extends Component {
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
    return (<Project profile={profile} projectData={projectData} {...other} />)
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    projectData: state.projectReducer.projectData,
    transactionPending: state.projectReducer.transactionPending,
    error: state.projectReducer.error
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
