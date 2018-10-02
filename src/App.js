import React, { Component } from 'react'
import './App.css'

import Project from './Project/ProjectContainer.jsx'
import ProjectList from './Project/ProjectListContainer.jsx'

class App extends Component {
  render () {
    return (
      <ProjectList />
    )
  }
}

export default App
