import React, { Component } from 'react'
import { connect } from 'react-redux'
import Validator from './ValidatorComponent'
import { getProxyInfoList } from '../Project/actions'

class ValidatorContainer extends Component {
  componentDidMount () {
    this.props.getProxyInfoList()
  }

  render () {
    const { history, location, proxyInfoList } = this.props
    return (
      <Validator
        history={history}
        location={location}
        proxyInfoList={proxyInfoList}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    proxyInfoList: state.projectReducer.proxyInfoList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProxyInfoList: () => dispatch(getProxyInfoList())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatorContainer)
