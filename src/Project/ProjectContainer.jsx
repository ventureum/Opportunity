import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from './ProjectComponent'

class ProjectContainer extends Component {
  render () {
    return (<Project />)
  }
}

export default ProjectContainer
