import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyProjects from './MyProjectsComponent'

class MyProjectsContainer extends Component {
  render () {
    return (<MyProjects />)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  null,
  mapDispatchToProps
)(MyProjectsContainer)
