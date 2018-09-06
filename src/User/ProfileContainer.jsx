import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from './ProfileComponent'

class ProfileContainer extends Component {
  render () {
    return (<Profile />)
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.userInfo
  }
}
export default connect(
  mapStateToProps,
  null
)(ProfileContainer)
