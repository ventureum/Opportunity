import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import countryCodeToName from './countryCodeToName'

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
    const { classes, projectData, tokenInfo } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction='column' className={classes.projectInfo}>
          <Grid item className={classes.video}>
            {projectData.video &&
              <iframe key='video-frame' className={classes.videoFrame} src={`https://www.youtube.com/embed/${projectData.video.split('?v=')[1]}`} frameBorder='0' allow='encrypted-media' allowFullScreen />
            }
            {!projectData.video &&
              <img className={classes.videoFrame} src='https://icodrops.com/wp-content/uploads/2018/06/Haja-banner.jpg' alt='' />
            }
          </Grid>
          <Grid item className={classes.titleAbout}>
            About {projectData.name}
          </Grid>
          <Grid item className={classes.projectDesc}>
            {projectData.description}
          </Grid>
          <Grid item className={classes.expand}>
            Read more about the project
          </Grid>
          <Grid item>
            <Grid container direction='row'>
              <Grid item xs={12} sm={6} className={classes.block}>
                <i className={'fas fa-map-marker-alt ' + classes.blockImg} />
                {projectData.corporationInfo.location.city}, {projectData.corporationInfo.location.country}
              </Grid>
              <Grid item xs={12} sm={6} className={classes.block}>
                <i className={'fas fa-tag ' + classes.blockImg} />
                {projectData.category}
              </Grid>
              <Grid item xs={12} sm={6} className={classes.block}>
                <i className={'fas fa-globe-americas ' + classes.blockImg} />
                <a className={classes.link} href={projectData.website} target='_blank'>View website</a>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.block}>
                <i className={'fas fa-link ' + classes.blockImg} />
                <a className={classes.link} href={projectData.whitepaper} target='_blank'>View Whitepaper</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.coreTeam}>
            <Grid container direction='column'>
              <Grid item className={classes.titleTeam} md={12}>
                Core Team
              </Grid>
              <Grid item md={12}>
                <Grid container className={classes.team} direction='row'>
                  {projectData.corporationInfo.team.members.map((person, i) => {
                    if (!expandTeam && i >= 3) {
                      return null
                    }
                    return (
                      <Grid item key={i} className={classes.personWrap} sm={4} lg={3} xs={12}>
                        <Grid container className={classes.person} direction='column' alignItems='center'>
                          <Grid item>
                            <img className={classes.memberAvatar} src={projectData.logo} alt='' />
                          </Grid>
                          <Grid item className={classes.memberName}>
                            {person.name}
                          </Grid>
                          <Grid item className={classes.memberTitle}>
                            {person.title}
                          </Grid>
                        </Grid>
                        <a href={person.linkedin} className={classes.linkedIn}>
                          <img className={classes.linkedInImg} src={projectData.logo} alt='' />
                        </a>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
              {projectData.corporationInfo.team.members.length > 3 &&
                <Grid item className={classes.expand} onClick={this.toggleTeam}>
                  Show all {projectData.corporationInfo.team.members.length} team members
                </Grid>
              }
            </Grid>
          </Grid>
          <Grid item>
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
                        {projectData.token.symbol}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Tokens&nbsp;for&nbsp;sale
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {tokenInfo.forSale}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Price
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        1&nbsp;{projectData.token.symbol}&nbsp;=&nbsp;{projectData.token.price}&nbsp;ETH
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Platform
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {projectData.token.platform}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Accepting
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {projectData.token.accept.join(', ')}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        KYC
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {projectData.token.KYC ? 'Yes' : 'No'}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item className={classes.key} xs={7} md={6}>
                        Can't participate
                      </Grid>
                      <Grid item className={classes.value} xs={5} md={6}>
                        {projectData.token.cantParticipate.map((code) => countryCodeToName(code)).join(', ')}
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
  link: {
    textDecoration: 'none',
    color: '#1B95E0'
  },
  projectInfo: {
    color: '#464C4E'
  },
  video: {
    height: '314px'
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
    display: 'flex',
    marginBottom: '29.14px',
    alignItems: 'center'
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
  team: {
    width: 'calc(100% + 20px)',
    marginLeft: '-10px'
  },
  personWrap: {
    padding: '10px',
    position: 'relative'
  },
  person: {
    height: '180px',
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
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '19px'
  },
  linkedIn: {
    position: 'absolute',
    right: '27.07px',
    top: '18.06px'
  },
  linkedInImg: {
    height: '18.87px',
    width: '18.87px',
    '&:hover': {
      cursor: 'pointer'
    }
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
  }
})

export default withStyles(theme)(ProjectDetailComponent)