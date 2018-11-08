import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ProjectDetail from './ProjectDetailComponent'

const iconMap = {
  'telegram': 'fab fa-telegram-plane',
  'github': 'fab fa-github-alt',
  'reddit': 'fab fa-reddit-alien',
  'twitter': 'fab fa-twitter',
  'facebook': 'fab fa-facebook-f',
  'slack': 'fab fa-slack-hash'
}

class ProjectInfoComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tokenInfo: {
        forSale: '18000000'
      },
      projectData: {
        projectName: 'Blockcloud',
        logo: '/mock_logo.png',
        shortDescription: 'A Blockchain-based Advanced TCP/IP Architecture Providing Constant Connectivity for Dynamic Networks',
        video: 'https://www.youtube.com/watch?v=64kQLRZeE_E',
        description: 'While BigData has traditionally been available only to big companies, Blockcloud.io lowers the barrier for entry and expands our potential client base to include small, medium and large businesses around the globe as well as ICOs seeking data for their new ventures.',
        corporationInfo: {
          location: {
            country: 'CA',
            city: 'Toronto'
          },
          team: {
            teamSize: 6,
            members: [
              {
                name: 'Raul Romero',
                title: 'CEO',
                link: 'https://www.google.com'
              }, {
                name: 'Zi Wen Zhang',
                title: 'CTO',
                link: 'https://www.google.com'
              }, {
                name: 'Lawrence Duerson',
                title: 'COO',
                link: 'https://www.google.com'
              }, {
                name: 'Raul Romero',
                title: 'CEO',
                link: 'https://www.google.com'
              }, {
                name: 'Zi Wen Zhang',
                title: 'CTO',
                link: 'https://www.google.com'
              }, {
                name: 'Lawrence Duerson',
                title: 'COO',
                link: 'https://www.google.com'
              }
            ]
          }
        },
        category: 'Artificial Intelligence',
        website: 'https://www.google.com',
        whitepaper: 'https://www.google.com',
        token: {
          symbol: 'BLOC',
          price: '10',
          platform: 'Ethereum',
          accept: ['ETH', 'BTC'],
          KYC: true,
          cantParticipate: ['CN', 'US']
        },
        socialLinks: [
          {
            type: 'telegram',
            link: 'https://www.google.com'
          }, {
            type: 'github',
            link: 'https://www.google.com'
          }, {
            type: 'reddit',
            link: 'https://www.google.com'
          }, {
            type: 'twitter',
            link: 'https://www.google.com'
          }, {
            type: 'facebook',
            link: 'https://www.google.com'
          }, {
            type: 'slack',
            link: 'https://www.google.com'
          }
        ]
      }
    }
  }

  render () {
    const { tokenInfo, projectData } = this.state
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container className={classes.root} direction='row' justify='center'>
          <Grid item className={classes.header} xs={12}>
            <Grid container direction='row' justify='center'>
              <Grid item xs={11} lg={9} xl={7}>
                <Grid container direction='row'>
                  <Grid item md={2} lg={2}>
                    <img className={classes.projectLogo} src={projectData.logo} alt='' />
                  </Grid>
                  <Grid item className={classes.headerRight} md={7}>
                    <Grid container direction='column'>
                      <Grid item className={classes.headerName}>
                        {projectData.projectName}
                      </Grid>
                      <Grid item className={classes.headerShortDesc}>
                        {projectData.shortDescription}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11} md={6} lg={5} xl={4}>
            <ProjectDetail projectData={projectData} tokenInfo={tokenInfo} />
          </Grid>
          <Grid item md={1} />
          <Grid item xs={11} md={4} lg={3} xl={2}>
            <Grid container direction='column'>
              <Grid item className={classes.tokenDetail}>
                <Grid container direction='column'>
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
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button className={classes.getToken}>
                      Get Token
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction='column'>
                  <Grid item className={classes.titleSocialLink}>
                    Social Links
                  </Grid>
                  <Grid item>
                    <Grid container direction='row' justify='center'>
                      {projectData.socialLinks.map((item, i) => (
                        <Grid item key={i} className={classes.socialLinkItem} xs={2} md={1}>
                          <a href={item.link}>
                            <i className={iconMap[item.type] + ' ' + classes.socialLinkIcon} />
                          </a>
                        </Grid>
                      ))}
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
  root: {
    width: '100%',
    backgroundColor: '#F3F6FC',
    position: 'relative'
  },
  link: {
    textDecoration: 'none',
    color: '#1B95E0'
  },
  header: {
    padding: '46px 0',
    backgroundColor: '#7178F8',
    marginBottom: '20px'
  },
  projectLogo: {
    height: '98.81px',
    width: '98.81px',
    borderRadius: '50px'
  },
  headerRight: {
    color: 'white'
  },
  headerName: {
    lineHeight: '32px',
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  headerShortDesc: {
    lineHeight: '19px',
    fontSize: '16px'
  },
  key: {
    lineHeight: '2',
    fontWeight: 'bold'
  },
  value: {
    lineHeight: '2',
    fontWeight: '100'
  },
  tokenDetail: {
    borderRadius: '6px',
    boxShadow: '0 2px 5px 0 rgba(106,106,106,0.05)',
    backgroundColor: 'white',
    padding: '47px 53px'
  },
  getToken: {
    padding: '0',
    width: '100%',
    borderRadius: '4px',
    height: '66px',
    color: 'white',
    backgroundColor: '#01A78D',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '66px',
    marginTop: '30px'
  },
  titleSocialLink: {
    marginTop: '27px',
    marginBottom: '20px',
    fontSize: '16px',
    textAlign: 'center',
    padding: '0 112px',
    color: '#464C4E'
  },
  socialLinkItem: {
    textAlign: 'center'
  },
  socialLinkIcon: {
    fontSize: '20px',
    color: '#464C4E',
    marginBottom: '20px'
  }
})

export default withStyles(theme)(ProjectInfoComponent)
