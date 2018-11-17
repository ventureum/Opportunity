import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyProjects from './MyProjectsComponent'
import { getProjectPageData } from '../Project/actions'
import { getWallets, addWallet, removeWallet } from './actions'

class MyProjectsContainer extends Component {
  componentWillMount () {
    this.props.getWallets(this.props.profile.actor)
    this.props.getProjectPageData(this.props.profile.actor)
  }

  addWallet = (walletAddress) => {
    this.props.addWallet(this.props.profile.actor, walletAddress)
  }

  removeWallet = (walletAddress) => {
    this.props.removeWallet(this.props.profile.actor, walletAddress)
  }

  render () {
    return (<MyProjects
      wallets={this.props.wallets}
      projects={this.props.projects}
      finalizedValidators={this.props.finalizedValidators}
      proxyVotingInfoList={this.props.proxyVotingInfoList}
      profiles={this.props.profiles}
      profile={this.props.profile}
      requestStatus={this.props.requestStatus}
      addWallet={this.addWallet}
      removeWallet={this.removeWallet}
    />)
  }
}

const mapStateToProps = state => {
  return {
    wallets: state.userReducer.wallets,
    profile: state.userReducer.profile,
    projects: state.projectReducer.projects,
    finalizedValidators: state.projectReducer.finalizedValidators,
    proxyVotingInfoList: state.projectReducer.proxyVotingInfoList,
    profiles: state.userReducer.profiles,
    requestStatus: state.requestReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWallets: (actor) => dispatch(getWallets(actor)),
    getProjectPageData: (actor) => dispatch(getProjectPageData(actor)),
    addWallet: (actor, walletAddress) => dispatch(addWallet(actor, walletAddress)),
    removeWallet: (actor, walletAddress) => dispatch(removeWallet(actor, walletAddress))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProjectsContainer)
