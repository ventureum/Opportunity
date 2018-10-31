import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import MyProjects from './MyProjectsComponent'

class MyProjectsContainer extends Component {
  state = {
    walletAddress: []
  }

  addWallet = (address) => {
    if (this.state.walletAddress.indexOf(address) < 0) {
      this.setState({
        walletAddress: update(this.state.walletAddress, { $push: [address] })
      })
    }
  }

  removeWallet = (address) => {
    this.setState({
      walletAddress: update(this.state.walletAddress, { $splice: [[this.state.walletAddress.indexOf(address), 1]] })
    })
  }

  render () {
    return (<MyProjects walletAddress={this.state.walletAddress} addWallet={this.addWallet} removeWallet={this.removeWallet} />)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  null,
  mapDispatchToProps
)(MyProjectsContainer)
