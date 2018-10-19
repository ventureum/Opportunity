import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProxyVoting from './ProxyVotingComponent'
import { getValidators, getVoteInfo, vote } from './actions'

class ProxyVotingContainer extends Component {
  componentDidMount () {
    let { getValidators, getVoteInfo } = this.props
    getValidators()
    getVoteInfo()
  }

  render () {
    let { validators, voteInfo, vote } = this.props
    return (<ProxyVoting validators={validators} voteInfo={voteInfo} vote={vote} />)
  }
}

const mapStateToProps = state => {
  return {
    validators: state.projectReducer.validators,
    voteInfo: state.projectReducer.voteInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getValidators: (objId) => dispatch(getValidators(objId)),
    getVoteInfo: (userId) => dispatch(getVoteInfo(userId)),
    vote: (objId, userId, validators) => dispatch(vote(objId, userId, validators))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProxyVotingContainer)
