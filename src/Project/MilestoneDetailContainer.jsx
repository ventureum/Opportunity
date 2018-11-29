import React, { Component } from 'react'
import { connect } from 'react-redux'
import MilestoneDetail from './MilestoneDetailComponent'
import { rateObj } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class MilestoneDetailContainer extends Component {
  render () {
    let { handleClose, profile, milestone, rateObj, ...others } = this.props
    return (
      <MilestoneDetail
        handleClose={handleClose}
        profile={profile}
        milestone={milestone}
        rateObj={rateObj}
        {...others}
      />
    )
  }
}

const rateObjLoadingSelector = createLoadingSelector(['RATE_OBJ'])
const errorSelector = createErrorSelector(['RATE_OBJ'])

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    actionsPending: {
      rateObj: rateObjLoadingSelector(state)
    },
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rateObj: (projectId, milestoneId, ratings, comment) => dispatch(rateObj(projectId, milestoneId, ratings, comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneDetailContainer)
