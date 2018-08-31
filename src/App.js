import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <Router>
          <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default App
