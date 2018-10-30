import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBarComponent'
import { logout } from './actions'

class NavBarContainer extends Component {
  render () {
    return (<NavBar userInfo={{ username: 'Lezhong', photo_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' }} logout={this.props.logout} />)
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.userInfo
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
