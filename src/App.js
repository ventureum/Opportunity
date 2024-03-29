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
import FAQ from './Static/FAQ'
import ProxyVoting from './Project/ProxyVotingContainer'
import * as apiUser from './User/apis'
import * as apiProject from './Project/apis'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'

if (apiUser.apiFeed.defaults.headers.common['Authorization'] === undefined) {
  apiUser.apiFeed.defaults.headers.common['Authorization'] = 'No Access Token'
}
if (apiProject.apiTcr.defaults.headers.common['Authorization'] === undefined) {
  apiProject.apiTcr.defaults.headers.common['Authorization'] = 'No Access Token'
}

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

const componentStyle = {
  minHeight: '80vh'
}

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div style={defaultLayoutStyle}>
        <div style={componentStyle}>
          <Component {...matchProps} />
        </div>
        <Footer />
      </div>
    )} />
  )
}

class App extends Component {
  componentDidMount () {
    const link = document.createElement('link')
    link.setAttribute(
      'href',
      'https://fonts.googleapis.com/css?family=Open+Sans')
    link.setAttribute(
      'rel',
      'stylesheet')
    document.head.appendChild(link)
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path='/login' component={userIsNotAuthenticated(Login)} />
            <DefaultLayout exact path='/' component={ProjectList} />
            <DefaultLayout path='/project/:projectId' component={Project} />
            <DefaultLayout path='/my-projects' component={userIsAuthenticated(MyProjects)} />
            <DefaultLayout path='/project-management' component={userIsAuthenticated(ProjectManagement)} />
            <DefaultLayout path='/validators' component={Validator} />
            <DefaultLayout path='/ProxyVoting/:projectId' component={userIsAuthenticated(ProxyVoting)} />
            <DefaultLayout path='/faq' component={FAQ} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    fontFamily: 'Open Sans'
  }
})

export default withStyles(theme)(App)
