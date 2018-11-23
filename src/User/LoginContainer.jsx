import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './LoginComponent'
import { onLogin, register, fetchAccessToken } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

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
    let { onLogin, register, userInfo, fetchAccessToken, ...others } = this.props
    return (
      <Login
        onLogin={onLogin}
        register={register}
        userInfo={userInfo}
        fetchAccessToken={fetchAccessToken}
        {...others}
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

const fetchLoginDataLoadingSelector = createLoadingSelector(['FETCH_LOGIN_DATA'])
const fetchAccessTokenLoadingSelector = createLoadingSelector(['FETCH_ACCESS_TOKEN'])
const registerLoadingSelector = createLoadingSelector(['REGISTER'])
const errorSelector = createErrorSelector(['FETCH_LOGIN_DATA', 'FETCH_ACCESS_TOKEN'])

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.userInfo,
    actionsPending: {
      fetchLoginData: fetchLoginDataLoadingSelector(state),
      fetchAccessToken: fetchAccessTokenLoadingSelector(state),
      register: registerLoadingSelector(state)
    },
    error: errorSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
