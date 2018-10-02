import React, { Component } from 'react'
import {
  Redirect
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import logo from '../logo.svg'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
var numeral = require('numeral')

class ProjectListComponent extends Component {
  constructor () {
    super()

    this.state = {
      redirectPath: null,
      redirectArgs: null
    }
  }

  onClickProject = (p) => {
    console.log(p)
    this.setState({
      redirectPath: `/project/${p.projectId}`,
      redirectArgs: p
    })
  }

  renderProjectCard = (p) => {
    const { classes } = this.props
    return (
      <Grid item key={p.projectId}>
        <Card className={classes.card}>
          <CardActionArea onClick={() => this.onClickProject(p)}>
            <CardMedia
              className={classes.media}
              image={p.content.wideLogo}
              title={p.content.projectName}
            />
            <CardContent>
              <Typography className={classes.title} color='textSecondary'>
                { p.content.shortDescription }
              </Typography>
              <Grid container direction='row' alignItems='center'>
                <Grid item xs={7} lg={7}>
                  <Grid className={classes.cardMilestonesInProgressContainer} container direction='row' justify='flex-start' alignItems='center'>
                    <img src={logo} className={classes.cardMilestoneInProgressIcon} />
                    <Typography className={classes.cardMilestonesInProgressText} color='textSecondary'>
                      { p.milestoneInProgress ? 'In Progress' : '' }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <Typography className={classes.cardMilestonesComplete} >
                    { p.milestonesCompleted } MS COMPLETED
                  </Typography>
                </Grid>
                <Grid item xs={1} lg={1}>
                  <Typography className={classes.cardMilestonesRating} >
                    { numeral(p.rating / 10.0).format('0.0') }
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }

  render () {
    const { redirectPath, redirectArgs } = this.state
    const { classes, projects } = this.props

    if (redirectPath) {
      // redirect to another page
      console.log(redirectPath, redirectArgs)
      return (<Redirect to={redirectPath} />)
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar className={classes.topBanner} position='static' color='default'>
            <Toolbar>
              <img src={logo} className={classes.topBannerLogo} />
              <Typography className={classes.topBannerLogoText}>
                Milestone
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item>
              <Grid container direction='column' justify='center' alignItems='stretch'>
                <Grid item>
                  <div className={classes.projectListContainer} >
                    <Grid container direction='row' justify='center' alignItems='center' spacing={16}>
                      { projects.map(p => this.renderProjectCard(p))}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  root: {
    height: '100vh',
    width: '100vw'
  },
  card: {
    maxWidth: 400
  },
  media: {
    height: 200,
    width: 400
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  projectListContainer: {
    marginTop: '5%',
    marginRight: '20%',
    marginLeft: '20%'
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
  cardMilestoneInProgressIcon: {
    width: '20px',
    paddingRight: '5%'
  },
  cardMilestonesInProgressText: {
    alignSelf: 'center'
  },
  cardMilestonesInProgressContainer: {
    backgroundColor: '#FFFFFF',
    color: 'black'
  },
  cardMilestonesComplete: {
    width: '110px',
    borderRadius: '4px',
    backgroundColor: '#1ec8cd',
    textAlign: 'center',
    padding: '5px 0',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  cardMilestonesRating: {
    width: '30px',
    borderRadius: '4px',
    backgroundColor: '#a3bf43',
    textAlign: 'center',
    padding: '5px 0',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
})

export default withStyles(theme)(ProjectListComponent)
