import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TransactionProgress from '../Notification/TransactionProgress'
import Error from '../Error/ErrorComponent'
import nanoid from 'nanoid/non-secure'
import logo from '../logo.svg'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'

class Login extends Component {
  constructor (props) {
    super(props)
    let { userInfo } = this.props
    this.state = {
      redirectToReferrer: false,
      agreementChecked: false,
      requestToken: nanoid(24) + '_WEB',
      accessTokenExpired: !userInfo.accessToken || (moment().unix() >= userInfo.accessTokenExp)
    }
  }

  componentDidMount () {
    let { userInfo, onLogin } = this.props
    if (!this.state.accessTokenExpired) {
      // auto login if access token has not expired
      // also refresh profile data
      onLogin(userInfo)
    }
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

  onLogin = event => {
    let { requestToken } = this.state
    window.open(`https://telegram.me/Milestone_Auth_bot?start=${requestToken}`, '_blank')
    this.props.fetchAccessToken(this.state.requestToken)
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
    let { classes, actionsPending } = this.props
    return (
      <Grid item className={classes.loginButton} align='center'>
        { actionsPending.fetchAccessToken && <CircularProgress /> }
        { !actionsPending.fetchAccessToken &&
          <Button variant='contained'
            color='primary'
            onClick={this.onLogin}
            className={classes.loginBtnLink}
          >
          Login with Telegram
          </Button>
        }
      </Grid>
    )
  }

  render () {
    let { accessTokenExpired } = this.state
    let { classes, userInfo, actionsPending, error } = this.props
    if (error) {
      return (<Error error={error} />)
    }

    if (!accessTokenExpired && actionsPending.fetchLoginData) {
      // access token is still valid, use it instead of fetching a new one
      // in the meanwhile, refresh user profile and disply a spinner
      return (
        <Grid container className={classes.root} direction='column' justify='center' alignItems='center'>
          <Grid item>
            <Grid container direction='column' justify='center' alignItems='center'>
              <CircularProgress className={classes.progress} />
            </Grid>
          </Grid>
        </Grid>
      )
    }

    return (
      <Grid container className={classes.root} direction='column' justify='center' alignItems='center'>
        <Grid item>
          <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item>
              <img src={logo} alt='' />
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
        { actionsPending.register && <TransactionProgress open /> }
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
  loginBtnLink: {
    color: 'white',
    textDecoration: 'none'
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
