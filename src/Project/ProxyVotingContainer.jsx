import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProxyVoting from './ProxyVotingComponent'
import { getProxyList, getVoteInfo, delegate } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

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
    let { handleClose, proxyList, proxyVotingInfo, delegate, profile, project, ...others } = this.props
    return (<ProxyVoting
      handleClose={handleClose}
      proxyList={proxyList}
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
const getProxyListLoadingSelector = createLoadingSelector(['GET_PROXY_LIST'])
const delegateLoadingSelector = createLoadingSelector(['DELEGATE'])
const errorSelector = createErrorSelector(['GET_VOTE_INFO', 'GET_PROXY_LIST', 'DELEGATE'])

const mapStateToProps = state => {
  return {
    proxyVotingInfo: state.projectReducer.proxyVotingInfo,
    profile: state.userReducer.profile,
    proxyList: state.projectReducer.proxyList,
    actionsPending: {
      getVoteInfo: getVoteInfoLoadingSelector(state),
      getProxyList: getProxyListLoadingSelector(state),
      delegate: delegateLoadingSelector(state)
    },
    error: errorSelector(state)
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
