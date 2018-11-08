import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBarComponent'
import { logout, getProfile } from './actions'
import { getUUID } from '../utils/index'

class NavBarContainer extends Component {
  componentDidMount () {
    const { id } = this.props.userInfo
    const UUID = getUUID(id)
    this.props.getProfile(String(UUID))
  }

  render () {
    return (
      <NavBar
        userInfo={this.props.userInfo}
        logout={this.props.logout}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: loginData => dispatch(logout()),
    getProfile: id => { dispatch(getProfile(id)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer)
