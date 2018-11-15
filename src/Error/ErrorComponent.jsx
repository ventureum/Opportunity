import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class ErrorComponent extends Component {
  render () {
    let { classes, error } = this.props
    if (error) {
      return (
        <MuiThemeProvider theme={theme}>
          <Grid container className={classes.root} direction='column' justify='center' alignItems='flex-start'>
            <Grid item>
              <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item xs={7} >
                  <Typography className={classes.heading} >
                    Looks like we're having some issues.
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography className={classes.subtitle} >
                    Go back to the previous page and try again.
                    If you think something is broken, report a problem.
                  </Typography>
                  <Grid container direction='row' className={classes.btnContainer}>
                    <Grid item>
                      <Button variant='outlined' className={classes.homeBtn}>
                        GO TO HOMEPAGE
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant='outlined' className={classes.reportBtn}>
                        REPORT A PROBLEM
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      )
    }
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
    fontSize: '36px',
    lineHeight: '46px'
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: '27px'
  },
  divider: {
    marginTop: '35px',
    marginBottom: '35px'
  },
  homeBtn: {
    width: '210px',
    color: '#01a78d',
    border: '2px solid #01a78d',
    borderRadius: '99px',
    padding: '8px 30px 9px',
    marginRight: '25px',
    marginTop: '15px'
  },
  reportBtn: {
    width: '210px',
    color: '#01a78d',
    border: '2px solid #01a78d',
    borderRadius: '99px',
    padding: '8px 30px 9px',
    marginTop: '15px'
  },
  btnContainer: {
    marginTop: '45px'
  }
})

export default withStyles(theme)(ErrorComponent)
