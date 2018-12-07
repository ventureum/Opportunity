import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBarComponent'
import { logout } from './actions'

class NavBarContainer extends Component {
  render () {
    const { history, location, profile, logout } = this.props
    return (<NavBar history={history} location={location} profile={profile} logout={logout} />)
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: loginData => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer)
