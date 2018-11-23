import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBarComponent'
import { logout } from './actions'

class NavBarContainer extends Component {
  render () {
    return (<NavBar profile={this.props.profile} logout={this.props.logout} />)
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
