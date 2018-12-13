import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProxyVoting from './ProxyVotingComponent'
import { getProxyListForProject, getVoteInfo, delegate } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class ProxyVotingContainer extends Component {
  componentDidMount () {
    let { getProxyListForProject, getVoteInfo, project, profile } = this.props
    getProxyListForProject(project.projectId, Number.MAX_SAFE_INTEGER)
    getVoteInfo(profile.actor, project.projectId, Number.MAX_SAFE_INTEGER)
  }

  refreshVoteInfo = () => {
    let { getVoteInfo, project, profile } = this.props
    getVoteInfo(profile.actor, project.projectId, Number.MAX_SAFE_INTEGER)
  }

  render () {
    let { handleClose, projectProxyList, proxyVotingInfo, delegate, profile, project, ...others } = this.props
    return (<ProxyVoting
      handleClose={handleClose}
      projectProxyList={projectProxyList}
      proxyVotingInfo={proxyVotingInfo}
      delegate={delegate}
      project={project}
      profile={profile}
      refreshVoteInfo={this.refreshVoteInfo}
      {...others}
    />)
  }
}

const getVoteInfoLoadingSelector = createLoadingSelector(['GET_VOTE_INFO'])
const getProxyListForProjectLoadingSelector = createLoadingSelector(['GET_PROXY_LIST_FOR_PROJECT'])
const delegateLoadingSelector = createLoadingSelector(['DELEGATE'])
const errorSelector = createErrorSelector(['GET_VOTE_INFO', 'GET_PROXY_LIST_FOR_PROJECT', 'DELEGATE'])

const mapStateToProps = state => {
  return {
    proxyVotingInfo: state.projectReducer.proxyVotingInfo,
    profile: state.userReducer.profile,
    projectProxyList: state.projectReducer.projectProxyList,
    actionsPending: {
      getVoteInfo: getVoteInfoLoadingSelector(state),
      getProxyListForProject: getProxyListForProjectLoadingSelector(state),
      delegate: delegateLoadingSelector(state)
    },
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVoteInfo: (actor, projectId, limit) => dispatch(getVoteInfo(actor, projectId, limit)),
    getProxyListForProject: (projectId, limit) => dispatch(getProxyListForProject(projectId, limit)),
    delegate: (projectId, actor, pct) => dispatch(delegate(projectId, actor, pct))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProxyVotingContainer)
