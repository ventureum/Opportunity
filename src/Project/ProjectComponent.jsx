import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
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
import Toolbar from '@material-ui/core/Toolbar'
import ProjectDetail from './ProjectDetailComponent'
import logo from '../logo.svg'
var numeral = require('numeral')

var moment = require('moment')

class ProjectComponent extends Component {
  constructor () {
    super()
    this.state = {
      tabValue: 0,
      ready: false,
      tokenInfo: {
        forSale: '18000000'
      }
    }
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
        key={m.id}
        iconStyle={iconData.iconStyle}
        icon={iconData.icon}
      >
        <h3 className='vertical-timeline-element-title'> { content.title } </h3>
        <Typography className={classes.milestoneContent} variant='subheading'>
          { content.description }
        </Typography>
        <Grid className={classes.milestoneBottom} container direction='row' justify='space-between' alignItems='center'>
          <Grid item>
            <Typography className={classes.milestoneTime} variant='subheading'>
              { time }
            </Typography>
          </Grid>
          <Grid item>
            <Button className={classes.scoreButton} variant='contained' color='primary'>
              { numeral(m.avgRating / 10.0).format('0.0') }
            </Button>
          </Grid>
        </Grid>
      </VerticalTimelineElement>
    )
  }

  renderTimeline = () => {
    let { classes, projectData } = this.props
    return (
      <Grid item>
        <VerticalTimeline animate={false}>
          { projectData.milestoneInfo.milestones.map((m) => this.renderMilestone(m))}
        </VerticalTimeline>
      </Grid>
    )
  }

  renderDetail = () => {
    let { projectData } = this.props
    return (
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Grid item lg={6}>
            <ProjectDetail projectData={projectData} />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render () {
    let { tabValue } = this.state
    let { classes, projectData } = this.props

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
      <MuiThemeProvider theme={theme}>
        <Grid container className={classes.root} direction='column'>
          <Grid item>
            <Grid container direction='column' justify='center' alignItems='stretch'>
              <Grid item>
                <AppBar className={classes.topBanner} position='static' color='default'>
                  <Toolbar>
                    <img src={logo} className={classes.topBannerLogo} />
                    <Typography className={classes.topBannerLogoText}>
                      Milestone
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Grid>
              <Grid item>
                <Grid container className={classes.topSection} direction='row' justify='center' alignItems='center'>
                  <Grid item>
                    <img className={classes.topSectionProjectLogo} src='https://icobench.com/images/icos/icons/datablockchain.jpg' />
                  </Grid>
                  <Grid item lg={5}>
                    <Grid container direction='column' justify='center' alignItems='flex-start'>
                      <Grid item>
                        <Typography className={classes.topSectionProjectName} >
                          { projectData.content.projectName }
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.topSectionProjectShortDescription} variant='headline'>
                          { projectData.content.shortDescription }
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='column' justify='center' alignItems='center'>
                      <Grid item>
                        <Typography className={classes.topSectionRating} >
                          { numeral(projectData.avgRating / 10.0).format('0.0') }
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
                  </Tabs>
                </AppBar>
              </Grid>
              { tabValue === 0 && this.renderTimeline() }
              { tabValue === 1 && this.renderDetail() }
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  root: {
    height: '100vh',
    width: '100vw'
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
  milestoneContent: {
    marginTop: '5%',
    color: '#666666',
    fontSize: '14px'
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
  }
})

export default withStyles(theme)(ProjectComponent)
