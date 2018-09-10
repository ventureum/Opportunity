import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from './ProfileComponent'
import { logout, getProfile, getVoteList, getPostList, getReplyList } from './actions'

class ProfileContainer extends Component {
  render () {
    return (<Profile
      logout={this.props.logout}
      getProfile={this.props.getProfile}
      userInfo={this.props.userInfo}
      profile={this.props.profile}
      voteList={this.props.voteList}
      postList={this.props.postList}
      replyList={this.props.replyList}
      getVoteList={this.props.getVoteList}
      getPostList={this.props.getPostList}
      getReplyList={this.props.getReplyList}
    />)
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.userInfo,
    profile: state.userReducer.profile,
    voteList: state.userReducer.voteList,
    postList: state.userReducer.postList,
    replyList: state.userReducer.replyList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: loginData => dispatch(logout()),
    getProfile: username => dispatch(getProfile(username)),
    getVoteList: username => dispatch(getVoteList(username)),
    getPostList: username => dispatch(getPostList(username)),
    getReplyList: username => dispatch(getReplyList(username))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
