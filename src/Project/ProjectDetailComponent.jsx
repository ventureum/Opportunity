import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'
import countryCodeToName from './countryCodeToName'
import classNames from 'classnames'

class ProjectDetailComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expandInfo: false,
      expandTeam: false
    }

    this.toggleTeam = this.toggleTeam.bind(this)
  }

  toggleTeam () {
    this.setState({
      expandTeam: !this.state.expandTeam
    })
  }

  render () {
    const { expandTeam } = this.state
    const { classes, projectData } = this.props
    const content = projectData.content

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction='column' alignItems='flex-start' justify='flex-start' className={classes.projectInfo}>
          <Grid container direction='row' alignItems='center' justify='center' className={classes.wideLogo}>
            <Grid item>
              {projectData.video &&
              <iframe title='project_video' key='video-frame' className={classes.videoFrame} src={`https://www.youtube.com/embed/${projectData.video.split('?v=')[1]}`} frameBorder='0' allow='encrypted-media' allowFullScreen />
              }
              {!projectData.video &&
              <img src={content.wideLogo}
                alt='wide-logo'
                className={classes.video}
              />
              }
            </Grid>
          </Grid>
          <Grid container direction='column' className={classes.about}>
            <Grid item className={classes.titleAbout}>
              About {content.projectName}
            </Grid>
            <Grid item className={classes.projectDesc}>
              { content.shortDescription }
            </Grid>
            <Grid item className={classes.expand}>
              <a className={classes.link} href={content.website} target='_blank' rel='noopener noreferrer'>
              Read more about the project
              </a>
            </Grid>
            <Grid item>
              <Grid container direction='row'>
                <Grid item xs={12} sm={6} className={classes.block}>
                  <i className={classNames('fas', 'fa-map-marker-alt', classes.blockImg)} />
                  {content.corporationInfo.location.country}
                </Grid>
                <Grid item xs={12} sm={6} className={classes.block}>
                  <i className={classNames('fas', 'fa-tag', classes.blockImg)} />
                  {content.category}
                </Grid>
                <Grid item xs={12} sm={6} className={classes.block}>
                  <i className={classNames('fas', 'fa-globe-americas', classes.blockImg)} />
                  <a className={classes.link} href={content.website} target='_blank' rel='noopener noreferrer'>View website</a>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.block}>
                  <i className={classNames('fas', 'fa-link', classes.blockImg)} />
                  <a className={classes.link} href={content.whitepaper} target='_blank' rel='noopener noreferrer'>View Whitepaper</a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='column' className={classes.coreTeam}>
            <Grid item className={classes.titleTeam} md={12}>
                Core Team
            </Grid>
            <Grid item>
              <GridList cellHeight='auto' cols={3} className={classes.teamGridList}>
                {content.corporationInfo.team.members.map((person, i) => {
                  if (!expandTeam && i >= 3) {
                    return null
                  }
                  return (
                    <GridListTile key={i} >
                      <Grid item className={classes.personWrap} >
                        <Grid container className={classes.person} direction='column' alignItems='center'>
                          <Grid item>
                            <img className={classes.memberAvatar} src={content.logo} alt='' />
                          </Grid>
                          <Grid item>
                            <Typography className={classes.memberName}>
                              {person.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.memberTitle}>
                              {person.title}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </GridListTile>
                  )
                })}
              </GridList>
            </Grid>
            {content.corporationInfo.team.members.length > 3 &&
              <Grid item className={classes.expand} onClick={this.toggleTeam}>
                { !expandTeam && <div> Show all {content.corporationInfo.team.members.length} team members </div> }
                { expandTeam && <div> Hide team members </div> }
              </Grid>
            }
          </Grid>
          <Grid item className={classes.detail}>
            <Grid container direction='column'>
              <Grid item className={classes.titleIco}>
                ICO Details
              </Grid>
              <Grid item>
                <Grid container direction='column'>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Token
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {content.token.symbol}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Price
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        1&nbsp;{content.token.symbol}&nbsp;=&nbsp;{content.token.price}&nbsp;ETH
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Platform
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {content.token.platform}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Accepting
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {content.token.accept.join(', ')}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        KYC
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {content.token.KYC ? 'Yes' : 'No'}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Can't participate
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {content.token.cantParticipate.map((code) => countryCodeToName(code)).join(', ')}
                      </Grid>
                    </Grid>
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

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  link: {
    textDecoration: 'none',
    color: '#1B95E0'
  },
  projectInfo: {
    paddingTop: '10px',
    color: '#464C4E'
  },
  videoFrame: {
    height: '100%',
    width: '100%'
  },
  titleAbout: {
    marginTop: '28px',
    marginBottom: '28px',
    fontSize: '26px',
    fontWeight: 'bold'
  },
  projectDesc: {
    fontSize: '16px'
  },
  expand: {
    marginTop: '16px',
    marginBottom: '31px',
    color: '#1B95E0',
    fontSize: '16px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  block: {
    marginBottom: '29.14px',
    textAlign: 'left'
  },
  blockImg: {
    fontSize: '20px',
    marginRight: '11.07px'
  },
  coreTeam: {
    borderTop: '1px solid #DAE2ED',
    borderBottom: '1px solid #DAE2ED',
    paddingTop: '30px'
  },
  titleTeam: {
    fontSize: '22px',
    fontWeight: 'bold'
  },
  personWrap: {
    padding: '10px'
  },
  person: {
    minHeight: '180px',
    backgroundColor: 'white;',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05)',
    borderRadius: '6px'
  },
  memberAvatar: {
    height: '60px',
    width: '60px',
    borderRadius: '30px',
    marginTop: '32px'
  },
  memberName: {
    textAlign: 'center',
    marginTop: '12px',
    marginBottom: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '19px'
  },
  memberTitle: {
    color: '#7C878B',
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    maxWidth: '150px'
  },
  detail: {
    width: '100%'
  },
  titleIco: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '33.8px',
    marginBottom: '24px'
  },
  key: {
    lineHeight: '2',
    fontWeight: 'bold'
  },
  value: {
    lineHeight: '2',
    fontWeight: '100'
  },
  video: {
    '@media (max-width: 1024px)': {
      width: '100vw'
    },
    '@media (min-width: 1024px)': {
      minWidth: '623px'
    },
    height: 'auto'
  },
  wideLogo: {
    '@media (max-width: 1024px)': {
      maxWidth: '100%'
    }
  },
  teamGridList: {
    '@media (max-width: 1024px)': {
      width: '100vw'
    },
    '@media (min-width: 1024px)': {
      width: '30vw'
    }
  }
})

export default withStyles(theme)(ProjectDetailComponent)
