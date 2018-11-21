import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './LoginComponent'
import { onLogin, register, fetchAccessToken } from './actions'

class LoginContainer extends Component {
  constructor () {
    super()
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch (error, info) {
    this.setState(
      { error: error, errorInfo: info }
    )
  }

  render () {
    return (
      <Login
        onLogin={this.props.onLogin}
        register={this.props.register}
        userInfo={this.props.userInfo}
        fetchAccessToken={this.props.fetchAccessToken}
        transactionPending={this.props.transactionPending}
        error={this.props.error}
      />)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: loginData => dispatch(onLogin(loginData)),
    register: userInfo => dispatch(register(userInfo)),
    fetchAccessToken: requestToken => dispatch(fetchAccessToken(requestToken))
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.userInfo,
    transactionPending: state.userReducer.transactionPending,
    error: state.userReducer.error
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
