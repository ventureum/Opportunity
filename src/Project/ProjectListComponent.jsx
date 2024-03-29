import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import NavBar from '../User/NavBarContainer'
import { BarChart, Bar, YAxis } from 'recharts'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    this.setState({
      redirectPath: `/project/${p.projectId}`,
      redirectArgs: p
    })
  }

  getChartData = (milestonesInfo) => {
    let data = []
    if (milestonesInfo && milestonesInfo.milestones) {
      const length = milestonesInfo.milestones.length
      let index = length <= 5 ? 0 : length - 5
      while (index < length) {
        data.push({ avgRating: milestonesInfo.milestones[index.avgRating] })
        index++
      }
    }
    return data
  }

  renderProjectCard = (p) => {
    const { classes } = this.props
    const milstonesData = this.getChartData(p.milestonesInfo)
    return (
      <Grid item key={p.projectId}>
        <Card className={classes.card} >
          <CardActionArea onClick={() => this.onClickProject(p)}>
            <CardMedia
              className={classes.media}
              image={p.content.wideLogo}
              title={p.content.projectName}
            />
            <CardContent classes={{ root: classes.projectContent }}>
              <Grid container direction='column' >
                <Typography className={classes.projectName} color='textSecondary'>
                  {p.content.projectName}
                </Typography>
                <Typography noWrap className={classes.projectShortDescText}>
                  {p.content.shortDescription}
                </Typography>
                <Typography classes={{ root: classes.projectDescTextRoot }} className={classes.projectDescText}>
                  {p.content.description}
                </Typography>
              </Grid>
            </CardContent>
            <Grid container justify='space-between' alignItems='flex-end' className={classes.projectCardFooter}>
              <Grid item>
                <Typography className={classes.milestoneRatingText}>Milstone Rating</Typography>
                <Typography className={classes.milestoneCompletedText}>{p.milestonesInfo.numMilestonesCompleted} completed milstones</Typography>
              </Grid>
              <div className={classes.graphSection}>
                {milstonesData.length > 2
                  ? <BarChart width={46} height={40} data={milstonesData} barSize={8}>
                    <Bar dataKey='avgRating' fill='#01A78D' minPointSize={2} />
                    <YAxis hide type='number' domain={[0, 5]} />
                  </BarChart>
                  : null
                }
                {p.avgRating
                  ? <Typography className={classes.cardMilestonesRating} >
                    {numeral(p.avgRating / 10.0).format('0.0')}
                  </Typography>
                  : <Typography className={classes.cardMilestonesRatingNA} >
                    N/A
                  </Typography>
                }
              </div>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }

  render () {
    const { redirectPath, redirectArgs } = this.state
    const { classes, projects, history, location, actionsPending } = this.props

    if (redirectPath) {
      // redirect to another page
      console.log(redirectPath, redirectArgs)
      return (<Redirect push to={redirectPath} />)
    }

    return (
      <div className={classes.root}>
        <NavBar history={history} location={location} />
        <Grid container direction='column' alignItems='center'>
          <Grid container direction='column' className={classes.projectListContainer} alignItems='center'>
            <Typography variant='h4' className={classes.projectsHeader}>Projects</Typography>
            {actionsPending.getProjects
              ? <div ><CircularProgress /></div>
              : <Grid container direction='row' alignItems='center' spacing={16}>
                {projects.map(p => this.renderProjectCard(p))}
              </Grid>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

const style = theme => ({
  root: {
    flex: 1
  },
  card: {
    width: 360,
    height: 400
  },
  media: {
    height: 180,
    width: 360
  },
  projectContent: {
    padding: '20px 20px 0px 20px'
  },
  projectName: {
    fontSize: 24,
    fontWeight: 500,
    color: '#333333',
    lineHeight: '30px'
  },
  projectShortDescText: {
    color: '#333333',
    fontSize: '18px',
    lineHeight: '27px'
  },
  projectDescText: {
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '16px',
    color: '#666666',
    height: '48px'
  },
  projectDescTextRoot: {
    lineClamp: 3,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis'
  },
  projectCardFooter: {
    marginTop: '27px',
    borderTopWidth: '1px',
    borderTopColor: '#E9E9E9',
    borderTopStyle: 'solid',
    padding: '10px 20px 10px 20px',
    marginBottom: '2px'
  },
  milestoneRatingText: {
    color: '#333333',
    fontSize: '18px',
    lineHeight: '27px',
    letterSpacing: '0.29px'
  },
  milestoneCompletedText: {
    color: '#666666',
    letterSpacing: '0.2px',
    lineHeight: '18px',
    fontSize: '12px'
  },
  projectListContainer: {
    marginTop: '60px',
    marginBottom: '120px',
    '@media (min-width: 380px) and (max-width : 751px)': {
      maxWidth: '380px'
    },
    '@media (min-width: 752px) and (max-width : 1129px)': {
      maxWidth: '752px'
    },
    '@media (min-width: 1130px) and (max-width : 1489px)': {
      maxWidth: '1130px'
    },
    '@media (min-width: 1490px) ': {
      maxWidth: '1490px'
    }
  },
  topBanner: {
    backgroundColor: '#FFFFFF'
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
    backgroundColor: '#01A78D',
    textAlign: 'center',
    padding: '5px 0',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  cardMilestonesRatingNA: {
    width: '30px',
    borderRadius: '4px',
    backgroundColor: '#666666',
    textAlign: 'center',
    padding: '5px 0',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  projectsHeader: {
    marginBottom: 16,
    color: '#333333',
    alignSelf: 'flex-start'
  },
  graphSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
})

export default withStyles(style)(ProjectListComponent)
