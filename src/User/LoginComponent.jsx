import React, { Component } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TransactionProgress from '../Notification/TransactionProgress'
import Error from '../Error/ErrorComponent'

import logo from '../logo.svg'

class Login extends Component {
  state = {
    redirectToReferrer: false,
    agreementChecked: false
  }

  handleTelegramResponse = (response) => {
    if (response.auth_date) {
      this.setState({ redirectToReferrer: 'false' })
      this.props.onLogin(response)
    }
  }

  handleAgreementCheckboxChange = event => {
    this.setState({ agreementChecked: event.target.checked })
  }

  handleCompleteRegistration = event => {
    this.props.register(this.props.userInfo)
  }

  renderRegistration = () => {
    let { classes } = this.props
    return (
      <Grid item className={classes.loginButton} align='center'>
        <Grid container direction='column' alignItems='center' justify='center'>
          <Grid item>
            <Typography className={classes.content} variant='h5' gutterBottom>
              Welcome to Milestone!
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.agreementChecked}
                  onChange={this.handleAgreementCheckboxChange}
                />
              }
              label='I agree with terms and conditions'
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!this.state.agreementChecked}
              onClick={this.handleCompleteRegistration}
              variant='contained'
              color='primary'
            >
              Complete Registration
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderLoginBtn = () => {
    let { classes } = this.props
    return (
      <Grid item className={classes.loginButton} align='center'>
        <TelegramLoginButton dataOnauth={this.handleTelegramResponse} botName='ventureum_bot' />
      </Grid>
    )
  }

  render () {
    let { classes, userInfo, transactionPending, error } = this.props
    if (error) {
      return (<Error error={error} />)
    }
    return (
      <Grid container className={classes.root} direction='column' justify='center' alignItems='center'>
        <Grid item>
          <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item>
              <img src={logo} />
            </Grid>
            <Grid item className={classes.textSection} align='center'>
              <Typography className={classes.heading} variant='h3' gutterBottom align='center'>
                Milestone
              </Typography>
              <Typography className={classes.content} variant='h5' gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu feugiat ante, feugiat ultrices urna. Sed feugiat congue urna, in lacinia dolor accumsan faucibus.
              </Typography>
            </Grid>
            { userInfo.newUser ? this.renderRegistration() : this.renderLoginBtn() }
          </Grid>
        </Grid>
        { transactionPending && <TransactionProgress open /> }
      </Grid>
    )
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  root: {
    height: '100vh',
    width: '100vw'
  },
  heading: {
    marginTop: '42px',
    height: '43px',
    width: '100%',
    color: '#333333',
    fontSize: '32px',
    fontWeight: 'bold',
    letterSpacing: '0.56px',
    lineHeight: '43px'
  },
  content: {
    marginTop: '20px',
    width: '90vw',
    maxWidth: '640px',
    color: '#666666',
    fontSize: '18px',
    letterSpacing: '0.32px',
    lineHeight: '24px'
  },
  loginButton: {
    marginTop: '60px',
    color: 'black',
    height: '200px',
    minWidth: '800px'
  },
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#f44336'
    }
  }
})

export default withStyles(theme)(Login)
