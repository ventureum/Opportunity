import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectList from './ProjectListComponent'
import { getProjects } from './actions'

class ProjectListContainer extends Component {
  componentWillMount () {
    this.props.getProjects()
  }

  render () {
    let { projects } = this.props
    return (<ProjectList projects={projects} />)
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projectReducer.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => dispatch(getProjects())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListContainer)
