import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TelegramLoginButton from 'react-telegram-login'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

class Login extends Component {
  render() {
    let {classes, handleTelegramResponse} = this.props
    return (
      <Grid container className={classes.root} direction='column' justify='center' alignItems='center'>
        <Grid item>
          <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item>
              <img src='/logo.png' alt="logo" />
            </Grid>
            <Grid item className={classes.textSection} align='center'>
              <Typography className={classes.heading} variant="display2" gutterBottom align='center'>
                Milestone
              </Typography>
              <Typography className={classes.content} variant="headline" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu feugiat ante, feugiat ultrices urna. Sed feugiat congue urna, in lacinia dolor accumsan faucibus. 
              </Typography>
            </Grid>
            <Grid item className={classes.loginButton} align='center'>
              <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="ventureum_bot" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const theme = createMuiTheme({
  root: {
    height: '100vh',
    width: '100vw',
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
      main: '#f44336',
    },
  },
})

export default withStyles(theme)(Login)
