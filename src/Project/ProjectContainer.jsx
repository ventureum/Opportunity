import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from './ProjectComponent'
import { getProject, rateObj, getProxyList } from './actions'

class ProjectContainer extends Component {
  async componentDidMount () {
    let { match } = this.props
    if (match) {
      let projectId = match.params.projectId
      try {
        this.props.getProject(projectId)
        this.props.getProxyList(projectId)
      } catch (e) {
        this.setState({
          error: e
        })
      }
    }
  }

  render () {
    let { profile, projectData, proxyList, error } = this.props
    return (
      <Project
        profile={profile}
        projectData={projectData}
        proxyList={proxyList}
        error={error}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    projectData: state.projectReducer.projectData,
    proxyList: state.projectReducer.proxyList,
    error: state.projectReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProject: (projectId) => dispatch(getProject(projectId)),
    rateObj: (projectId, milestoneId, ratings, comment) => dispatch(rateObj(projectId, milestoneId, ratings, comment)),
    getProxyList: (projectId, limit) => dispatch(getProxyList(projectId, limit))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer)
