import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import NavBar from './NavBarContainer'
import Drawer from '@material-ui/core/Drawer'
import SvgIcon from '@material-ui/core/SvgIcon'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment'

var numeral = require('numeral')
class ValidatorComponent extends Component {
  state = {
    validatorDetailOpen: false
  }

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

  closeValidatorDetails = () => {
    this.setState({
      validatorDetailOpen: false,
      chosenValidator: null
    })
    this.props.clearValidatorRecentActivities()
  }

  viewValidatorDetails = (validator) => {
    this.props.getValidatorRecentActivities(validator.actor)
    this.setState({
      validatorDetailOpen: true,
      chosenValidator: validator
    })
  }

  CloseIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <path fill={props.className.color}
          d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
        />
      </SvgIcon>
    )
  }

  renderRecentActivities = () => {
    const { validatorRecentActivies, classes } = this.props
    const { chosenValidator } = this.state
    return (validatorRecentActivies.map((activity, i) => {
      return (
        <Grid item xs={12} key={i} className={classes.recentActivity}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Grid container alignItems='center'>
                <Grid item>
                  <img src={chosenValidator.photoUrl} alt='' className={classes.activityLogo} />
                </Grid>
                <Grid item>
                  <Grid container direction='column' justify='center' >
                    <Grid item>
                      <Typography className={classes.projectNameText}>{activity.projectContent.projectName}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.subtext}>{activity.milestoneContent.title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction='column' alignItems='flex-end' justify='center'>
                <Grid item>
                  <Typography align='right' className={classes.detailValidatorName}>{numeral(activity.rating).format('0.0')}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subtext}>{moment(activity.blockTimestamp).format('L')}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    })
    )
  }

  renderValidatorDetails = () => {
    const { classes, actionsPending, validatorRecentActivies } = this.props
    const { chosenValidator } = this.state
    return (
      <div className={classes.detailContainer}>
        <Grid container direction='column' >

          {/* Top right close button */}
          <Grid item >
            <Grid container justify='flex-end'>
              <Button onClick={() => { this.closeValidatorDetails() }}>
                {this.CloseIcon({ className: classes.closeIcon })}
              </Button>
            </Grid>
          </Grid>

          {/* Avatar, name, and short description */}
          <Grid item>
            <Grid container alignItems='center' spacing={16}>
              <Grid item >
                <img src={chosenValidator.photoUrl} alt='' className={classes.smallValidatorAvatar} />
              </Grid>
              <Grid item xs={8}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography className={classes.detailNameText}>{chosenValidator.profileContent && chosenValidator.profileContent.name}</Typography>
                  </Grid>
                  <Grid item >
                    {/* Typography's 'noWrap' causes text overflow in grid */}
                    <Typography classes={{ root: classes.detailShortDescriptionRoot }} className={classes.detailShortDescription} >{chosenValidator.profileContent && chosenValidator.profileContent.shortDescription}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Long Description */}
          <Grid item>
            <Grid container className={classes.detailDescContainer}>
              <Grid item>
                <Typography
                  className={classes.detailDescText}
                  classes={{ root: classes.detailDescRoot }}
                >
                  {chosenValidator.profileContent && chosenValidator.profileContent.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Projects and reputation */}
          <Grid item className={classes.detailScrollSection}>
            <Grid container direction='column'>
              <Grid item className={classes.projectAndReputationSection}>
                <Grid container>
                  <Grid item xs={6} className={classes.projectAndReputation}>
                    <Typography className={classes.detailNameText} align='center'>{validatorRecentActivies.length}</Typography>
                    <Typography className={classes.subtext} align='center'>Project</Typography>
                  </Grid>
                  <Grid item xs={6} className={classes.projectAndReputation}>
                    <Typography className={classes.detailNameText} align='center'>{chosenValidator.rewardsInfo.reputation}</Typography>
                    <Typography className={classes.subtext} align='center'>Reputation</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.recentValidationText}>Recent Validations</Typography>
              </Grid>
              <Grid item>
                {actionsPending.getValidatorRecentActivities
                  ? <div className={classes.recentActivitiesSection}><CircularProgress /></div>
                  : <Grid container >
                    {this.renderRecentActivities()}
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  render () {
    const { history, location, classes, proxyInfoList } = this.props
    const { chosenValidator } = this.state
    return (
      <div className={classes.root}>
        <NavBar history={history} location={location} />
        <Grid container alignItems='center'>
          <Drawer anchor='right' open={this.state.validatorDetailOpen} onClose={() => { this.closeValidatorDetails() }}>
            {chosenValidator
              ? this.renderValidatorDetails()
              : null
            }
          </Drawer>
          <Grid container direction='column' alignItems='center'>
            <Grid container alignItems='center' direction='column' className={classes.validatorSection}>
              <Typography className={classes.validatorHeader} variant='h4'>Validators</Typography>
              <Grid container direction='row' alignItems='center' justify='flex-start' spacing={16}>
                {proxyInfoList.map((validator, i) => (
                  <Grid item key={i}>
                    <div className={classes.validator} onClick={() => { this.viewValidatorDetails(validator) }}>
                      <img src={validator.photoUrl} alt='' className={classes.validatorAvatar} />
                      <Typography className={classes.validatorName}>{validator.profileContent.name}</Typography>
                      <Typography
                        align='center'
                        className={classes.validatorShortDescText}
                        classes={{ root: classes.validatorShortDescRoot }}
                      >
                        {validator.profileContent.shortDescription}
                      </Typography>
                      <Grid className={classes.reputaionContainer}>
                        <Typography className={classes.reputationText}>
                          Reputation
                        </Typography>
                        <Typography className={classes.reputation}>{numeral(validator.rewardsInfo.reputation).format('0.0a')}</Typography>
                      </Grid>
                    </div>
                  </Grid>
                ))
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flex: 1
  },
  validator: {
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05)',
    height: '305px',
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
  validatorShortDescText: {
    color: '#666666',
    fontSize: '12px',
    lineHeight: '18px',
    width: '70%'
  },
  validatorSection: {
    marginTop: '60px',
    '@media (min-width: 280px) and (max-width : 566px)': {
      maxWidth: '280px'
    },
    '@media (min-width: 567px) and (max-width : 848px)': {
      maxWidth: '567px'
    },
    '@media (min-width: 849px) and (max-width : 1126px)': {
      maxWidth: '849px'
    },
    '@media (min-width: 1127px) and (max-width : 1416px)': {
      maxWidth: '1126px'
    },
    '@media (min-width: 1417px)': {
      maxWidth: '1417px'
    }
  },
  validatorHeader: {
    alignSelf: 'flex-start',
    color: '#333333',
    marginBottom: '16px'
  },
  validatorShortDescRoot: {
    lineClamp: 3,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    height: '53px'
  },
  reputaionContainer: {
    paddingLeft: '30px',
    paddingRight: '30px',
    marginTop: '15px',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  reputationText: {
    color: ' #666666',
    fontFamily: 'Helvetica Neue',
    fontSize: '12px',
    letterSpacing: '0.2px',
    lineHeight: '18px'
  },
  reputation: {
    color: ' #333333',
    fontFamily: 'Helvetica Neue',
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 500
  },
  detailContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
      padding: '20px 20px 0px 20px'

    },
    [theme.breakpoints.up('sm')]: {
      width: '40vw',
      padding: '30px 30px 0px 30px'
    }
  },
  closeIcon: {
    color: '#666666'
  },
  smallValidatorAvatar: {
    height: '60px',
    width: 'auto',
    borderRadius: '30px'
  },
  detailValidatorName: {
    color: ' #333333',
    fontFamily: 'Helvetica Neue',
    fontSize: '18px',
    lineHeight: '27px',
    fontWeight: 500,
    letterSpacing: '0.29px'
  },
  detailShortDescription: {
    color: ' #666666',
    fontFamily: 'Helvetica Neue',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.2px'
  },
  detailShortDescriptionRoot: {
    lineClamp: 2,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis'
  },
  subtext: {
    color: ' #666666',
    fontFamily: 'Helvetica Neue',
    fontSize: '12px',
    lineHeight: '28px',
    letterSpacing: '0.2px'
  },
  detailScrollSection: {
    marginTop: '20px'
  },
  projectAndReputationSection: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'row'
  },
  projectAndReputation: {
    backgroundColor: '#f4f7f7',
    border: '1px solid #E9e9e9',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    paddingTop: '11px',
    paddingBottom: '11px'
  },
  detailNameText: {
    color: ' #333333',
    fontFamily: 'Helvetica Neue',
    fontSize: '18px',
    letterSpacing: '0.29px',
    lineHeight: '27px',
    fontWeight: 500
  },
  detailDescText: {
    color: ' #666666',
    fontFamily: 'Helvetica Neue',
    fontSize: '14px',
    letterSpacing: '0.23px',
    lineHeight: '21px'
  },
  detailDescRoot: {
    lineClamp: 7,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis'
  },
  recentValidationText: {
    color: ' #333333',
    fontFamily: 'Helvetica Neue',
    fontSize: '18px',
    letterSpacing: '0.29px',
    lineHeight: '27px',
    fontWeight: 500
  },
  detailDescContainer: {
    marginTop: '20px',
    paddingRight: '10px'
  },
  recentActivitiesSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  recentActivity: {
    borderWidth: '1px 0px 1px 0px',
    borderStyle: 'solid',
    borderColor: '#E9E9E9',
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  activityLogo: {
    height: '64px',
    width: '64px',
    borderRadius: '4px',
    marginRight: '20px'
  },
  projectNameText: {
    color: ' #333333',
    fontFamily: 'Helvetica Neue',
    fontSize: '14px',
    letterSpacing: '0.29px',
    lineHeight: '22px',
    fontWeight: 500
  }
})

export default withStyles(styles)(ValidatorComponent)
