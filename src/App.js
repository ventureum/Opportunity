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
import ProjectManagement from './User/ProjectManagementContainer'
import Validator from './User/ValidatorContainer'
import Footer from './Static/Footer'

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

const defaultLayoutStyle = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
}

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div style={defaultLayoutStyle}>
        <Component {...matchProps} />
        <Footer />
      </div>
    )} />
  )
}

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={userIsNotAuthenticated(Login)} />
          <DefaultLayout exact path='/' component={ProjectList} />
          <DefaultLayout path='/project/:projectId' component={Project} />
          <DefaultLayout path='/my-projects' component={userIsAuthenticated(MyProjects)} />
          <DefaultLayout path='/project-management' component={userIsAuthenticated(ProjectManagement)} />
          <DefaultLayout path='/validators' component={Validator} />
        </Switch>
      </Router>
    )
  }
}

export default App
