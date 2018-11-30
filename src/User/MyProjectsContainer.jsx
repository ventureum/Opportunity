import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyProjects from './MyProjectsComponent'
import { getProjectPageData } from '../Project/actions'
import { getWallets, addWallet, removeWallet } from './actions'
import { createLoadingSelector, createErrorSelector } from '../selectors'

class MyProjectsContainer extends Component {
  componentWillMount () {
    this.getData()
  }

  getData = () => {
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
    let {
      wallets,
      projects,
      finalizedValidators,
      proxyVotingInfoList,
      profiles,
      profile,
      actionsPending
    } = this.props

    return (<MyProjects
      wallets={wallets}
      projects={projects}
      finalizedValidators={finalizedValidators}
      proxyVotingInfoList={proxyVotingInfoList}
      profiles={profiles}
      profile={profile}
      addWallet={this.addWallet}
      removeWallet={this.removeWallet}
      actionsPending={actionsPending}
      getData={this.getData}
    />)
  }
}

const getProjectPageDataLoadingSelector = createLoadingSelector(['GET_PROJECT_PAGE_DATA'])
const getWalletsLoadingSelector = createLoadingSelector(['GET_WALLETS'])
const addWalletLoadingSelector = createLoadingSelector(['ADD_WALLET'])
const removeWalletLoadingSelector = createLoadingSelector(['REMOVE_WALLET'])

const errorSelector = createErrorSelector(
  ['GET_PROJECT_PAGE_DATA',
    'GET_WALLETS',
    'REMOVE_WALLET',
    'ADD_WALLET'])

const mapStateToProps = state => {
  return {
    wallets: state.userReducer.wallets,
    profile: state.userReducer.profile,
    projects: state.projectReducer.projects,
    finalizedValidators: state.projectReducer.finalizedValidators,
    proxyVotingInfoList: state.projectReducer.proxyVotingInfoList,
    profiles: state.userReducer.profiles,
    actionsPending: {
      getProjectPageData: getProjectPageDataLoadingSelector(state),
      getWallets: getWalletsLoadingSelector(state),
      addWallet: addWalletLoadingSelector(state),
      removeWallet: removeWalletLoadingSelector(state)
    },
    error: errorSelector(state)
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
