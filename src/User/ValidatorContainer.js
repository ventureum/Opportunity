import React, { Component } from 'react'
import { connect } from 'react-redux'
import Validator from './ValidatorComponent'
import { getProxyInfoList, getValidatorRecentActivities, clearValidatorRecentActivities } from '../Project/actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class ValidatorContainer extends Component {
  componentDidMount () {
    this.props.getProxyInfoList()
  }

  render () {
    const {
      history,
      location,
      proxyInfoList,
      getValidatorRecentActivities,
      validatorRecentActivies,
      actionsPending,
      clearValidatorRecentActivities,
      error
    } = this.props
    return (
      <Validator
        history={history}
        location={location}
        proxyInfoList={proxyInfoList}
        getValidatorRecentActivities={getValidatorRecentActivities}
        validatorRecentActivies={validatorRecentActivies}
        actionsPending={actionsPending}
        clearValidatorRecentActivities={clearValidatorRecentActivities}
        error={error}
      />
    )
  }
}
const getValidatorRecentActivitiesLoadingSelector = createLoadingSelector(['GET_VALIDATOR_RECENT_ACTIVITIES'])
const getValidatorInfoListLoadingSelector = createLoadingSelector(['GET_PROXY_INFO_LIST'])
const errorSelector = createErrorSelector(['GET_VALIDATOR_RECENT_ACTIVITIES', 'GET_PROXY_INFO_LIST'])

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    proxyInfoList: state.projectReducer.proxyInfoList,
    validatorRecentActivies: state.projectReducer.validatorRecentActivies,
    actionsPending: {
      getValidatorRecentActivities: getValidatorRecentActivitiesLoadingSelector(state),
      getValidatorInfoList: getValidatorInfoListLoadingSelector((state))
    },
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProxyInfoList: () => dispatch(getProxyInfoList()),
    getValidatorRecentActivities: (actor, limit, cursor) => dispatch(getValidatorRecentActivities(actor, limit, cursor)),
    clearValidatorRecentActivities: () => dispatch(clearValidatorRecentActivities())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatorContainer)
