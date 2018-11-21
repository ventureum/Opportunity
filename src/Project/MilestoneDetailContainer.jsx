import React, { Component } from 'react'
import { connect } from 'react-redux'
import MilestoneDetail from './MilestoneDetailComponent'
import { rateObj } from './actions'

class MilestoneDetailContainer extends Component {
  render () {
    return (
      <MilestoneDetail
        handleClose={this.props.handleClose}
        profile={this.props.profile}
        milestone={this.props.milestone}
        rateObj={this.props.rateObj}
        requestStatus={this.props.requestStatus}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    requestStatus: state.requestReducer
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
