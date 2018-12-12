import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import NavBar from './NavBarContainer'

var numeral = require('numeral')

class ValidatorComponent extends Component {
  formatNumber = (val) => {
    let result
    if (val <= 1000) {
      val = parseInt(val, 10).toString()
      result = numeral(val).format('0,0a')
    } else {
      result = numeral(val).format('0,0.00a')
    }
    return result
  }

  render () {
    const { history, location, classes, proxyInfoList } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <NavBar history={history} location={location} />
        <Grid>
          <Grid container alignItems='center' direction='column' className={classes.validatorSection}>
            <Typography className={classes.validatorHeader} variant='h4'>Validators</Typography>
            <Grid container direction='row' alignItems='center' justify='flex-start' spacing={16}>
              {proxyInfoList.map((validator, i) => (
                <Grid item key={i}>
                  <div className={classes.validator} >
                    <img src={validator.photoUrl} alt='' className={classes.validatorAvatar} />
                    <Typography className={classes.validatorName}>{validator.profileContent.name}</Typography>
                    <Typography
                      align='center'
                      className={classes.validatorDesc}
                      classes={{ root: classes.validatorDescRoot }}
                    >
                      {validator.profileContent.shortDescription}
                    </Typography>
                  </div>
                </Grid>
              ))
              }
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  validator: {
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05)',
    height: '275px',
    width: '266px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '30px'
  },
  validatorAvatar: {
    height: '146px',
    width: 'auto',
    borderRadius: '73px',
    marginBottom: '20px'
  },
  validatorName: {
    color: '#333333',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '22px',
    marginBottom: '8px',
    letterSpacing: '0.23px',
    fontFamily: 'Helvetica Neue'
  },
  validatorDesc: {
    color: '#666666',
    fontSize: '12px',
    lineHeight: '18px',
    maxWidth: '70%'
  },
  validatorSection: {
    marginTop: '60px',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  validatorHeader: {
    alignSelf: 'flex-start',
    color: '#333333',
    marginBottom: '16px'
  },
  validatorDescRoot: {
    lineClamp: 3,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis'
  }
})

export default withStyles(theme)(ValidatorComponent)
