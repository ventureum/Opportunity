import React, { Component } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import Login from './User/LoginContainer'
import Project from './Project/ProjectContainer'
import ProjectList from './Project/ProjectListContainer'
import MyProjects from './User/MyProjectsContainer'

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state => state.userReducer.userInfo.isAuthenticated,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

const locationHelper = locationHelperBuilder({})

const userIsNotAuthenticated = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // If selector is true, wrapper will not redirect
  // So if there is no user data, then we show the page
  authenticatedSelector: state => !state.userReducer.userInfo.isAuthenticated,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={userIsNotAuthenticated(Login)} />
          <Route exact path='/' component={userIsAuthenticated(ProjectList)} />
          <Route path='/project/:projectId' component={Project} />
          <Route path='/my-projects' component={userIsAuthenticated(MyProjects)} />
        </Switch>
      </Router>
    )
  }
}

export default App
