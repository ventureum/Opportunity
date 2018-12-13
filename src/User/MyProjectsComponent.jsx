import React, { Component } from 'react'
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import WalletList from './WalletListComponent'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import NavBar from './NavBarContainer'
import Loading from '../Notification/Loading'
import Error from '../Error/ErrorComponent'
var commafy = require('commafy')
var moment = require('moment')

class MyProjectsComponent extends Component {
  state = {
    selectedVoteInfo: null,
    selectedProject: null,
    proxyVotingOpen: false,
    walletListOpen: false
  }

  handleOpenVote = (i) => {
    this.setState({
      selectedVoteInfo: this.props.proxyVotingInfoList[i],
      selectedProject: this.props.projects[i]
    })
    this.handleOpen('proxyVoting')
  }

  handleOpen = (name) => {
    this.setState({
      [name + 'Open']: true
    })
  }

  handleClose = (name) => {
    this.props.getData()
    this.setState({
      [name + 'Open']: false
    })
  }

  getValidatorProfile = (actor) => {
    let { profiles } = this.props
    if (profiles) {
      return profiles.find(function (p) { return p.actor === actor })
    }
  }

  isFinalizedValidator = (i, actor) => {
    let { finalizedValidators } = this.props
    return finalizedValidators &&
           finalizedValidators[i] &&
           finalizedValidators[i].validators &&
           finalizedValidators[i].validators.indexOf(actor) >= 0
  }

  render () {
    const {
      classes,
      wallets,
      addWallet,
      removeWallet,
      projects,
      proxyVotingInfoList,
      actionsPending,
      history,
      location,
      error } = this.props
    const { walletListOpen } = this.state

    if (error) {
      return (<Error error={error} />)
    }

    if (actionsPending.getProjectPageData) {
      return (
        <Loading />
      )
    }

    return (
      <MuiThemeProvider theme={theme}>
        <NavBar history={history} location={location} />
        <Grid container direction='row' justify='center' className={classes.projectsWrapper}>
          <Grid item xs={10} className={classes.titleWrapper}>
            <div className={classes.title}>My Projects</div>
            <div onClick={() => this.handleOpen('walletList')} className={classes.btnWallet}>Manage Wallets ({wallets.length})</div>
            <Modal
              disableRestoreFocus
              disableEnforceFocus
              disableAutoFocus
              BackdropProps={{ classes: { root: classes.backdrop } }}
              open={walletListOpen}
              onClose={() => this.handleClose('walletList')}
            >
              <Grid onClick={() => this.handleClose('walletList')} container direction='row' justify='flex-end'>
                <Grid className={classes.walletListModal} item xs={12} sm={6} md={4}>
                  <WalletList actionsPending={actionsPending} handleClose={() => this.handleClose('walletList')} wallets={wallets} addWallet={addWallet} removeWallet={removeWallet} />
                </Grid>
              </Grid>
            </Modal>
          </Grid>
          <Grid item xs={10}>
            <Grid container direction='row' spacing={16}>
              { proxyVotingInfoList.length === projects.length && // must have the same length
                projects.map((project, i) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={i}>
                      <div className={classes.project}>
                        <div className={classes.info}>
                          <img src={project.content.logo} alt='' className={classes.logo} />
                          <div>
                            <div className={classes.name}>{project.content.name}</div>
                            <div className={classes.vote}>You have {commafy(proxyVotingInfoList[i].availableDelegateVotes)} votes</div>
                          </div>
                        </div>
                        <div className={classes.milestone}>
                          <div>Upcoming Milestone</div>
                          <div>{project.upcomingMilestone ? moment.unix(project.upcomingMilestone.startDate).format('MMM Do, YYYY') : 'Not set' }</div>
                        </div>
                        <div className={classes.validatorWrapper}>
                          <div className={classes.validatorTitle}>My voted validators</div>
                          <div className={classes.validatorList}>
                            {proxyVotingInfoList[i].proxyVotingList &&
                             proxyVotingInfoList[i].proxyVotingList.map((validator, i) => {
                               let validatorProfile = this.getValidatorProfile(validator.proxy)
                               let validatorPhoto = validatorProfile ? validatorProfile.photoUrl : null
                               return (
                                 <div className={classes.validator} key={i}>
                                   <div className={classes.avatarWrapper}>
                                     <img className={classes.avatar} src={validatorPhoto} alt='' />
                                     {this.isFinalizedValidator(i, validator.proxy) &&
                                     <div className={classes.mark}>
                                       <i className='fas fa-check' />
                                     </div>
                                     }
                                   </div>
                                   <div>
                                     {validator.votesInPercent}%
                                   </div>
                                 </div>
                               )
                             })
                            }
                          </div>
                          {proxyVotingInfoList[i].proxyVotingList &&
                          <Button component={Link} to={`/ProxyVoting/${project.projectId}`} className={classes.btnUpdate}>
                             Update Voting
                          </Button>
                          }
                          {!proxyVotingInfoList[i].proxyVotingList &&
                          <Button component={Link} to={`/ProxyVoting/${project.projectId}`} className={classes.btnVote}>
                             Vote
                          </Button>
                          }
                        </div>
                      </div>
                    </Grid>
                  )
                })}
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
  projectsWrapper: {
    marginTop: '60px',
    fontFamily: 'Helvetica Neue'
  },
  titleWrapper: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: '#333333',
    fontSize: '24px',
    fontWeight: '500',
    letterSpacing: '0.3px',
    lineHeight: '29px'
  },
  btnWallet: {
    color: '#01A78D',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '17px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  project: {
    marginBottom: '30px',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    padding: '30px',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.5)'
  },
  info: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start'
  },
  logo: {
    height: '64px',
    width: '64px',
    borderRadius: '4px',
    backgroundColor: '#D8D8D8',
    marginRight: '10px'
  },
  name: {
    color: '#333333',
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '0.29px',
    lineHeight: '23px',
    marginBottom: '10px'
  },
  vote: {
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.23px',
    lineHeight: '16px'
  },
  milestone: {
    width: '100%',
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.23px',
    lineHeight: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #E9E9E9',
    borderBottom: '1px solid #E9E9E9',
    padding: '19px 0',
    marginTop: '20px',
    marginBottom: '20px'
  },
  validatorWrapper: {
    width: '100%'
  },
  validatorTitle: {
    marginBottom: '10px',
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.23px',
    lineHeight: '16px'
  },
  validatorList: {
    width: '100%'
  },
  validator: {
    display: 'inline-block',
    textAlign: 'center',
    color: '#666666',
    fontSize: '12px',
    letterSpacing: '0.15px',
    lineHeight: '14px',
    marginRight: '10px'
  },
  avatarWrapper: {
    position: 'relative'
  },
  avatar: {
    height: '32px',
    width: '32px',
    borderRadius: '16px',
    marginBottom: '3px'
  },
  mark: {
    height: '12px',
    width: '12px',
    borderRadius: '6px',
    backgroundColor: '#049D82',
    color: 'white',
    fontSize: '8px',
    position: 'absolute',
    right: '0',
    bottom: '5px'
  },
  iconPlus: {
    display: 'inline-block',
    height: '33px',
    width: '33px',
    border: '1px solid #E9E9E9',
    backgroundColor: '#F8F8F8',
    borderRadius: '17px',
    marginRight: '9px',
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: '33px',
    fontSize: '12px'
  },
  btnUpdate: {
    marginTop: '20px',
    color: '#01A78D',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '17px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  btnVote: {
    marginTop: '30px',
    padding: '0',
    height: '40px',
    lineHeight: '40px',
    width: '73px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    color: '#FFFFFF',
    fontFamily: '"Noto Sans"',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.23px',
    textTransform: 'none'
  },
  backdrop: {
    background: 'inherit'
  },
  walletListModal: {
    background: 'white',
    height: '100vh',
    overflow: 'auto',
    outline: 'none!important',
    borderLeft: '1px solid #E9E9E9',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)'
  }
})

export default withStyles(theme)(MyProjectsComponent)
