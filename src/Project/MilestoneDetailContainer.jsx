import React, { Component } from 'react'
import { connect } from 'react-redux'
import MilestoneDetail from './MilestoneDetailComponent'
import { rateObj, getRelatedPostsForMilestone } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class MilestoneDetailContainer extends Component {
  componentDidMount () {
    const { milestone, getRelatedPostsForMilestone } = this.props
    getRelatedPostsForMilestone(milestone.projectId, milestone.milestoneId)
  }

  render () {
    let {
      handleClose,
      profile,
      milestone,
      rateObj,
      actionsPending,
      error,
      relatedPostsForMilestone,
      getRelatedPostsForMilestone
    } = this.props

    return (
      <MilestoneDetail
        handleClose={handleClose}
        profile={profile}
        milestone={milestone}
        rateObj={rateObj}
        actionsPending={actionsPending}
        relatedPostsForMilestone={relatedPostsForMilestone}
        getRelatedPostsForMilestone={getRelatedPostsForMilestone}
        error={error}
      />
    )
  }
}

const rateObjLoadingSelector = createLoadingSelector(['RATE_OBJ'])
const getRelatedPostsForMilestoneLoadingSelector = createLoadingSelector(['GET_RELATED_POSTS_FOR_MILESTONE'])
const errorSelector = createErrorSelector(['RATE_OBJ', 'GET_RELATED_POSTS_FOR_MILESTONE'])

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    actionsPending: {
      rateObj: rateObjLoadingSelector(state),
      getRelatedPostsForMilestone: getRelatedPostsForMilestoneLoadingSelector(state)
    },
    relatedPostsForMilestone: state.projectReducer.relatedPostsForMilestone,
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rateObj: (projectId, milestoneId, ratings, comment) => dispatch(rateObj(projectId, milestoneId, ratings, comment)),
    getRelatedPostsForMilestone: (projectId, milestoneId) => dispatch(getRelatedPostsForMilestone(projectId, milestoneId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneDetailContainer)
