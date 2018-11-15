import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProxyVoting from './ProxyVotingComponent'
import { getProxyList, getVoteInfo, delegate } from './actions'

class ProxyVotingContainer extends Component {
  componentDidMount () {
    let { getProxyList, getVoteInfo, project, profile } = this.props
    getProxyList(project.projectId, Number.MAX_SAFE_INTEGER)
    getVoteInfo(profile.actor, project.projectId, Number.MAX_SAFE_INTEGER)
  }

  refreshVoteInfo = () => {
    let { getVoteInfo, project, profile } = this.props
    getVoteInfo(profile.actor, project.projectId, Number.MAX_SAFE_INTEGER)
  }

  render () {
    let { handleClose, proxyList, proxyVotingInfo, delegate, profile, requestStatus, project } = this.props
    return (<ProxyVoting
      handleClose={handleClose}
      proxyList={proxyList}
      proxyVotingInfo={proxyVotingInfo}
      delegate={delegate}
      project={project}
      profile={profile}
      requestStatus={requestStatus}
      refreshVoteInfo={this.refreshVoteInfo}
    />)
  }
}

const mapStateToProps = state => {
  return {
    proxyVotingInfo: state.projectReducer.proxyVotingInfo,
    profile: state.userReducer.profile,
    proxyList: state.projectReducer.proxyList,
    requestStatus: state.requestReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVoteInfo: (actor, projectId, limit) => dispatch(getVoteInfo(actor, projectId, limit)),
    getProxyList: (projectId, limit) => dispatch(getProxyList(projectId, limit)),
    delegate: (projectId, actor, pct) => dispatch(delegate(projectId, actor, pct))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProxyVotingContainer)
