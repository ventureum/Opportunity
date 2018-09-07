import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './LoginComponent'
import { onLogin } from './actions'

class LoginContainer extends Component {
  render () {
    return (<Login onLogin={this.props.onLogin} />)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: loginData => dispatch(onLogin(loginData))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer)
