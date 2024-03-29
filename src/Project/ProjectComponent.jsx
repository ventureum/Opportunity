import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Modal from '@material-ui/core/Modal'
import ProjectDetail from './ProjectDetailComponent'
import classNames from 'classnames'
import MilestoneDetail from './MilestoneDetailContainer'
import NavBar from '../User/NavBarContainer'
import Error from '../Error/ErrorComponent'

var numeral = require('numeral')

var moment = require('moment')

class ProjectComponent extends Component {
  constructor () {
    super()
    this.state = {
      open: false,
      selectedMilestone: null,
      tabValue: 0,
      ready: false,
      tokenInfo: {
        forSale: '18000000'
      }
    }
  }

  handleOpen = (milestone) => {
    this.setState({
      open: true,
      selectedMilestone: milestone
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      selectedMilestone: null
    })
  }

  renderObj = (o) => {
    return (
      <ListItem key={o.id} >
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
        <ListItemText
          primary={o.content}
        />
        <ListItemSecondaryAction>
          4.5
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  getMilestoneDateStr = (startTime, endTime) => {
    let start = null
    let end = null
    if (startTime > 0) {
      start = moment.unix(startTime).format('MMM Do YYYY')
    }
    if (endTime > 0) {
      end = moment.unix(endTime).format('MMM Do YYYY')
    }

    let rv = ' - '
    if (start) {
      rv = start + rv
    } else {
      // not activated yet
      return 'todo'
    }
    if (end) {
      rv = rv + end
    } else {
      rv = rv + 'present'
    }
    return rv
  }

  getMilestoneStateIcon = (state) => {
    let rv = {
      iconStyle: {
        background: '',
        color: '#fff'
      },
      icon: null
    }

    switch (state) {
      case 'COMPLETE':
        rv.iconStyle.background = '#01A78D'
        rv.icon = <CheckIcon />
        break
      case 'IN_PROGRESS':
        rv.iconStyle.background = '#FFFFFF'
        rv.iconStyle.border = 'solid 5px #01A78D'
        rv.icon = <FiberManualRecordIcon style={{ color: '#01A78D', fontSize: 300 }} />
        break
      case 'PENDING':
        rv.iconStyle.background = '#F7F7F7'
        rv.icon = null
        break
      default:
        throw new Error('Invalid milestone state')
    }
    return rv
  }

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value })
  }

  renderMilestone = (m) => {
    let { classes } = this.props
    let content = m.content
    let iconData = this.getMilestoneStateIcon(m.state)
    let time = this.getMilestoneDateStr(m.startTime, m.endTime)
    return (
      <VerticalTimelineElement
        key={m.milestoneId}
        iconStyle={iconData.iconStyle}
        icon={iconData.icon}
      >
        <div onClick={() => { this.handleOpen(m) }} className={classes.milestoneCard}>
          <h3 className={classNames(classes.milestoneTitle, 'vertical-timeline-element-title')}> {content.title} </h3>
          <Typography className={classes.milestoneContent} variant='subtitle1'>
            {content.description}
          </Typography>
          <Grid className={classes.milestoneBottom} container direction='row' justify='space-between' alignItems='center'>
            <Grid item>
              <Typography className={classes.milestoneTime} variant='subtitle1'>
                {time}
              </Typography>
            </Grid>
            <Grid item>
              <Button className={classes.scoreButton} variant='contained' color='primary'>
                {numeral(m.avgRating / 10.0).format('0.0')}
              </Button>
            </Grid>
          </Grid>
        </div>
      </VerticalTimelineElement>
    )
  }

  renderTimeline = () => {
    let { projectData } = this.props
    return (
      <Grid item>
        {projectData.milestonesInfo.milestones &&
          <VerticalTimeline animate={false}>
            {projectData.milestonesInfo.milestones.map((m) => this.renderMilestone(m))}
          </VerticalTimeline>
        }
      </Grid>
    )
  }

  renderDetail = () => {
    let { projectData, classes } = this.props
    return (
      <Grid item >
        <Grid container direction='column' alignItems='center'>
          <Grid item className={classes.detailContainer}>
            <ProjectDetail projectData={projectData} />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderValidators = () => {
    const { projectProxyList, classes } = this.props
    let projectProxyListCopy = JSON.parse(JSON.stringify(projectProxyList))
    // Get rid of zero votes.
    projectProxyListCopy = projectProxyListCopy.filter(validator => {
      return validator.proxyVoting.receivedDelegateVotes > 0
    })
    projectProxyListCopy.sort((a, b) => {
      const votesA = a.proxyVoting.receivedDelegateVotes
      const votesB = b.proxyVoting.receivedDelegateVotes
      return votesB - votesA
    })
    projectProxyListCopy = projectProxyListCopy.slice(0, Math.min(5, projectProxyList.length))
    return (
      <Grid container alignItems='center' direction='column' className={classes.validatorSection}>
        <Grid item className={classes.leadingValidatorTitle}>
          <Grid container>
            <Typography className={classes.leadingValidatorTitleText}>Leading Validators (In Progress)</Typography>
          </Grid>
        </Grid>
        {this.props.actionsPending.getProxyListForProject ? <div><CircularProgress /></div>
          : projectProxyListCopy.map((validator, i) => (
            <Grid key={i} item className={classes.validator}>
              <Grid container direction='row' >
                <Grid item xs={12} sm={8} className={classes.validatorInfo}>
                  <img src={validator.photoUrl} alt='' className={classes.validatorAvatar} />
                  <div>
                    <div className={classes.validatorName}>{validator.profileContent && validator.profileContent.name}</div>
                    <div className={classes.validatorDesc}>{validator.profileContent && validator.profileContent.shortDescription}</div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.verticalCenter}>
                  <div className={classes.block}>
                    <div className={classes.value}>{validator.rewardsInfo.reputation}</div>
                    <div>Reputation</div>
                  </div>
                  <div className={classes.block}>
                    <div className={classes.value}>{this.formatNumber(validator.proxyVoting.receivedDelegateVotes)}</div>
                    <div>Votes</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    )
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

  render () {
    let { open, tabValue, selectedMilestone } = this.state
    let { classes, projectData, error, history, location } = this.props

    if (error) {
      return (<Error error={error} />)
    }

    if (!projectData) {
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
      <Grid container className={classes.root} direction='column'>
        <Grid item>
          <Grid container direction='column' justify='center'>
            <Grid item>
              <NavBar history={history} location={location} />
            </Grid>
            <Grid item>
              <Grid container className={classes.topSection} direction='row' justify='center' alignItems='center'>
                <Grid item>
                  <img className={classes.topSectionProjectLogo} src={projectData.content.logo} alt='' />
                </Grid>
                <Grid item lg={5}>
                  <Grid container direction='column' justify='center' alignItems='flex-start'>
                    <Grid item>
                      <Typography className={classes.topSectionProjectName} >
                        {projectData.content.projectName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.topSectionProjectShortDescription} variant='h5'>
                        {projectData.content.shortDescription}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item>
                      <Typography className={classes.topSectionRating} >
                        {numeral(projectData.avgRating / 10.0).format('0.0')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.topSectionRatingDescription} >
                        Avg Milestone Rating
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <AppBar className={classes.tabsBar} position='static'>
                <Tabs indicatorColor='primary' value={tabValue} onChange={this.handleTabChange} centered >
                  <Tab label='MILESTONES' />
                  <Tab label='INFO' />
                  <Tab label='VALIDATORS' />
                </Tabs>
              </AppBar>
            </Grid>
            {tabValue === 0 && this.renderTimeline()}
            {tabValue === 1 && this.renderDetail()}
            {tabValue === 2 && this.renderValidators()}
            <Modal
              disableRestoreFocus
              disableEnforceFocus
              disableAutoFocus
              BackdropProps={{ classes: { root: classes.backdrop } }}
              open={open}
              onClose={this.handleClose}
            >
              <Grid onClick={this.handleClose} container direction='row' justify='flex-end'>
                <Grid className={classes.milestoneModal} item xs={12} sm={8} md={6}>
                  <MilestoneDetail
                    handleClose={this.handleClose}
                    milestone={selectedMilestone}
                  />
                </Grid>
              </Grid>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const style = theme => ({
  root: {
    flex: 1
  },
  error: {
    color: '#F23A30',
    fontSize: '20px'
  },
  section: {
    padding: '10px 10px 10px 10px'
  },
  scoreButton: {
    borderRadius: '4px',
    border: 0,
    color: 'white',
    height: '36px',
    width: '36px'
  },
  backdrop: {
    background: 'inherit'
  },
  milestoneCard: {
    margin: '-1.5em',
    padding: '1.5em',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  milestoneModal: {
    background: 'white',
    height: '100vh',
    overflow: 'auto',
    outline: 'none!important',
    borderLeft: '1px solid #E9E9E9',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)'
  },
  milestoneContent: {
    marginTop: '5%',
    color: '#666666',
    fontSize: '14px'
  },
  milestoneTitle: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  milestoneTime: {
    color: '#666666',
    fontSize: '14px'
  },
  milestoneBottom: {
    paddingTop: '20px',
    paddingBottom: '5px'
  },
  topBannerLogo: {
    width: '20px'
  },
  topBanner: {
    backgroundColor: '#FFFFFF'
  },
  topBannerLogoText: {
    fontSize: '15px',
    padding: '5px 5px 5px 5px'
  },
  topSection: {
    padding: '60px 0px 60px 0px'
  },
  topSectionProjectName: {
    color: '#333333',
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '0.39px',
    lineHeight: '33px'
  },
  topSectionProjectShortDescription: {
    maxWidth: '480px',
    marginTop: '5%',
    color: '#666666',
    fontSize: '18px',
    letterSpacing: '0.29px',
    lineHeight: '24px'
  },
  topSectionProjectLogo: {
    marginRight: '20px',
    height: '128px',
    width: '128px',
    borderRadius: '16px',
    backgroundColor: '#44517B'
  },
  topSectionRating: {
    width: '55px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    textAlign: 'center',
    padding: '5px 0',
    fontSize: '24px',
    color: '#FFFFFF'
  },
  topSectionRatingDescription: {
    marginTop: '5%',
    color: '#666666',
    fontSize: '18px',
    letterSpacing: '0.29px',
    lineHeight: '24px'
  },
  tabsBar: {
    backgroundColor: '#FFFFFF',
    color: 'rgba(0,0,0,0.6)'
  },
  detailSection: {
    marginTop: '60px'
  },
  palette: {
    primary: {
      light: '#01A78D',
      main: '#01A78D',
      dark: '#01A78D',
      contrastText: '#01A78D'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
  validator: {
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05)',
    marginBottom: '10px',
    padding: '28px',
    width: '60%',
    maxWidth: '900px'
  },
  validatorInfo: {
    display: 'flex'
  },
  validatorAvatar: {
    height: '53px',
    width: 'auto',
    borderRadius: '30px',
    marginRight: '19px'
  },
  validatorName: {
    color: '#464C4E',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '23px',
    marginBottom: '8px'
  },
  validatorDesc: {
    color: '#333333',
    fontSize: '14px',
    lineHeight: '16px'
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0'
  },
  block: {
    width: '50%',
    textAlign: 'center',
    fontSize: '12px',
    lineHeight: '14px'
  },
  value: {
    color: '#464C4E',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '23px',
    marginBottom: '2px'
  },
  validatorSection: {
    marginTop: '60px',
    marginBottom: '60px'
  },
  leadingValidatorTitle: {
    maxWidth: '900px',
    width: '60%',
    marginBottom: '20px'
  },
  leadingValidatorTitleText: {
    color: '#333333',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '29px'
  },
  detailContainer: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: '16px',
      paddingRight: '16px'
    },
    maxWidth: '600px',
    width: '100%'
  }
})

export default withStyles(style)(ProjectComponent)
