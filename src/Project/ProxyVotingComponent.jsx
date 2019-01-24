import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import numeral from 'numeral'
import classNames from 'classnames'
import Loading from '../Notification/Loading'
import TransactionProgress from '../Notification/TransactionProgress'
import Error from '../Error/ErrorComponent'
import NavBar from '../User/NavBarContainer'
import { Link } from 'react-router-dom'

class ProxyVotingComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedValidators: [],
      sort: 'vote',
      voteStep: 0,
      keyword: '',
      showSearch: false
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.actionsPending.delegate && !this.props.actionsPending.delegate) {
      this.props.refreshVoteInfo()
    }
  }

  sortBy = (val) => {
    this.setState({
      sort: val
    })
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

  formatVote = (votesInPercent) => {
    if (this.props.proxyVotingInfo.availableDelegateVotes * votesInPercent % 100 === 0) {
      return this.props.proxyVotingInfo.availableDelegateVotes * votesInPercent / 100
    } else {
      return numeral(this.props.proxyVotingInfo.availableDelegateVotes * votesInPercent / 100).format('0.0a')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.actionsPending.delegate &&
      nextProps.proxyVotingInfo !== null &&
      nextProps.proxyVotingInfo.proxyVotingList !== null) {
      // deep copy voted proxies.
      const newArray = JSON.parse(JSON.stringify(nextProps.proxyVotingInfo.proxyVotingList))
      this.setState({ selectedValidators: newArray, firstUpdated: true })
    }
  }

  usedPercent = () => {
    let usedPercent = 0
    this.state.selectedValidators.forEach((item) => {
      usedPercent += item.votesInPercent
    })
    return usedPercent
  }

  calcAvailableVotes = () => {
    const votes = this.props.proxyVotingInfo.availableDelegateVotes || 0
    const usedPercent = this.usedPercent()
    let avaliableVotes = votes * (100 - usedPercent) / 100
    if (avaliableVotes === parseInt(avaliableVotes)) {
      return avaliableVotes
    } else {
      return avaliableVotes.toFixed(1)
    }
  }

  togglePerson = (actor, checked) => {
    if (this.props.actionsPending.delegate) return
    if (checked) {
      // add to selected
      this.setState({ selectedValidators: [...this.state.selectedValidators, { proxy: actor, votesInPercent: 0, newAdded: true }] })
    } else {
      const target = this.state.selectedValidators.find((item) => {
        return item.proxy === actor
      })
      if (target.newAdded) {
        this.setState({
          selectedValidators: this.state.selectedValidators.filter((item) => {
            return item.proxy !== actor
          })
        })
      } else {
        this.changePercent(actor, 0)
      }
    }
  }

  removePerson = (actor, status) => {
    if (this.props.actionsPending.delegate) return
    if (status) {
      this.setState({
        selectedValidators: this.state.selectedValidators.filter((item) => {
          return item.proxy !== actor
        })
      })
    } else {
      this.changePercent(actor, 0)
    }
  }

  changePercent = (actor, e) => {
    this.setState({
      selectedValidators: this.state.selectedValidators.map((item) => {
        if (item.proxy === actor) return { ...item, votesInPercent: e }
        else return item
      })
    })
  }

  getAvailablePercent = (oldValue = 0) => {
    let result = []
    for (let votesInPercent = 0; votesInPercent <= (100 - this.usedPercent() + oldValue); votesInPercent += 10) {
      result.push(votesInPercent)
    }
    return result
  }

  vote = () => {
    let proxyList = []
    let votesInPercentList = []
    this.state.selectedValidators.forEach((item) => {
      let validator = this.actorToValidator(item.proxy)
      proxyList.push(validator.publicKey)
      votesInPercentList.push(item.votesInPercent)
    })
    this.props.delegate(this.props.projectId, proxyList, votesInPercentList)
  }

  search = () => {
    let keyword = this.state.keyword
    if (!keyword) {
      this.setState({
        showSearch: false
      })
    } else {
      this.setState({
        showSearch: true
      })
    }
  }

  actorToValidator = (actor) => {
    for (let validator of this.props.projectProxyList) {
      if (validator.actor === actor) {
        return validator
      }
    }
    return null
  }

  actorToVoteInfo = (actor) => {
    if (this.props.proxyVotingInfo.proxyVotingList) {
      for (let validator of this.props.proxyVotingInfo.proxyVotingList) {
        if (validator.actor === actor) {
          return validator
        }
      }
    }
    return null
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    }, this.search)
  }

  getVoteDom = () => {
    const { classes, proxyVotingInfo } = this.props
    const { selectedValidators } = this.state

    if (!proxyVotingInfo) {
      return null
    } else {
      return (
        <Grid item xs={12} md={4}>
          <div className={classes.voteWrapper}>
            <div className={classes.voteTitle}>My votes ({this.calcAvailableVotes()}/{proxyVotingInfo.availableDelegateVotes} available)</div>
            <div>
              <div className={classes.voteText}>{selectedValidators.length === 0 ? 'Select your validator(s) from the left' : 'Edit your votes'}</div>
              {selectedValidators.length === 0
                ? <img src='/vote-2.png' alt='' className={classes.voteImage} />
                : selectedValidators.map((actor, i) => {
                  if (actor.newAdded !== true && actor.votesInPercent === 0) {
                    return null
                  }
                  let validator = this.actorToValidator(actor.proxy)
                  return (
                    <div className={classes.personWrapper} key={i}>
                      <div className={classes.personName}>{validator.profileContent && validator.profileContent.name ? validator.profileContent.name : validator.username}</div>
                      <Select
                        className={classes.personSelectWrapper}
                        classes={{ root: classes.personSelectRoot, select: classes.personSelect }}
                        value={actor.votesInPercent}
                        onChange={(e) => {
                          this.changePercent(actor.proxy, e.target.value)
                        }}
                      >
                        {this.getAvailablePercent(actor.votesInPercent).map((val, i) => <MenuItem key={val} value={val}>{val}%</MenuItem>)}
                      </Select>
                      <div className={classes.personVotes}>{this.formatVote(actor.votesInPercent)} Votes</div>
                      <i onClick={() => { this.removePerson(actor.proxy, actor.newAdded) }} className={classNames('fas', 'fa-times-circle', classes.personClose)} />
                    </div>
                  )
                })
              }
              <Button component={Link} to='/my-projects' className={classes.btnCancel}>
                Cancel
              </Button>
              <Button
                onClick={this.vote}
                className={classNames({
                  [classes.btnVote]: selectedValidators.length !== 0,
                  [classes.btnVoteDisabled]: selectedValidators.length === 0
                })
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </Grid>
      )
    }
  }

  render () {
    const { classes, projectProxyList, actionsPending, location, history, error } = this.props
    const { selectedValidators, sort, keyword, showSearch } = this.state

    if (error) {
      return (<Error error={error} />)
    }

    if (actionsPending.getProxyListForProject || actionsPending.getVoteInfo) {
      return (
        <Loading />
      )
    }

    let displayValidators = projectProxyList
    if (showSearch) {
      let lcKeyword = keyword.toLowerCase()
      displayValidators = displayValidators.filter((validator) => {
        let targetProperties = ['username', 'description']
        for (let property of targetProperties) {
          if ((validator[property] && validator[property].toLowerCase().indexOf(lcKeyword) >= 0) ||
            (validator.profileContent && validator.profileContent.name && validator.profileContent.name.toLowerCase().indexOf(lcKeyword) >= 0)) {
            return true
          }
        }
        return false
      })
    } else {
      displayValidators.sort((a, b) => {
        if (sort === 'vote') {
          return b.proxyVoting.receivedDelegateVotes - a.proxyVoting.receivedDelegateVotes
        } else {
          return b.rewardsInfo.reputation - a.rewardsInfo.reputation
        }
      })
    }

    return (
      <div>
        <NavBar history={history} location={location} />
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item className={classes.proxyVoting} onClick={(e) => e.stopPropagation()} xs={10}>
            <Grid container direction='row' spacing={24}>
              <Grid item xs={12} md={8}>
                <Grid container direction='row'>
                  <Grid item xs={12}>
                    <Grid container direction='row' justify='center' className={classes.menu}>
                      <Grid item xs={12} sm={3} md={4} className={classes.bold}>
                        {displayValidators.length} Validators
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <TextField
                          className={classes.search}
                          type='text'
                          value={keyword}
                          onChange={this.handleChange}
                          InputProps={{
                            className: classes.searchInputWrapper,
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  onClick={this.search}
                                >
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5} md={4} className={classes.sortWrapper}>
                        Sort by:&nbsp;
                        <div className={classNames(classes.btnSort, { [classes.active]: sort === 'vote' })} onClick={() => this.sortBy('vote')} >Votes</div>
                        &nbsp;|&nbsp;
                        <div className={classNames(classes.btnSort, { [classes.active]: sort === 'reputation' })} onClick={() => this.sortBy('reputation')}>Reputations</div>
                      </Grid>
                    </Grid>
                  </Grid>
                  {displayValidators.map((validator, i) => (
                    <Grid item xs={12} key={i}>
                      <Grid container direction='row' className={classes.validator}>
                        <Grid item xs={12} sm={8} className={classes.validatorInfo}>
                          <img src={validator.photoUrl} alt='' className={classes.validatorAvatar} />
                          <div>
                            <div className={classes.validatorName}>{validator.profileContent && validator.profileContent.name ? validator.profileContent.name : validator.username}</div>
                            <div className={classes.validatorDesc}>{validator.profileContent.shortDescription}</div>
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
                          <div>
                            <Checkbox
                              classes={{ root: classes.checkbox }}
                              checked={!!(selectedValidators && selectedValidators.find((item) => {
                                return item.proxy === validator.actor && (item.votesInPercent !== 0 || item.newAdded === true)
                              }))
                              }
                              onChange={(event, checked) => this.togglePerson(validator.actor, checked)}
                              color='primary'
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {this.getVoteDom()}
            </Grid>
          </Grid>
        </Grid>
        {actionsPending.delegate && <TransactionProgress open />}
      </div>
    )
  }
}

const style = theme => ({
  proxyVoting: {
    padding: '60px',
    borderRadius: '5px'
  },
  menu: {
    marginBottom: '20px'
  },
  sortWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333333'
  },
  bold: {
    color: '#464C4E',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '23px',
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    width: '100%'
  },
  searchInputWrapper: {
    height: '34px',
    backgroundColor: 'white',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.32)',
    '&:before': {
      border: 'none!important'
    },
    '&:hover:before': {
      borderBottom: 'none!important'
    },
    '&:after': {
      borderBottom: 'none!important'
    },
    paddingLeft: '10px'
  },
  btnSort: {
    color: '#01A78D',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  active: {
    color: 'inherit',
    '&:hover': {
      cursor: 'default'
    }
  },
  validator: {
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05)',
    marginBottom: '10px',
    padding: '28px'
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
  checkbox: {
    color: '#01A78D!important'
  },
  voteWrapper: {
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05)',
    padding: '20px',
    textAlign: 'center'
  },
  progress: {
    color: 'white',
    marginTop: '-3px'
  },
  progressSvg: {
    transform: 'scale(0.7)'
  },
  voteTitle: {
    color: '#464C4E',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '23px',
    marginBottom: '10px'
  },
  voteText: {
    color: '#464C4E',
    fontSize: '16px',
    lineHeight: '18px',
    marginBottom: '40px'
  },
  voteImage: {
    width: '50%',
    margin: '0 auto',
    marginBottom: '40px',
    display: 'block'
  },
  btnStartVoting: {
    padding: '0',
    height: '50px',
    width: '168px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    margin: '0 auto',
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '18px'
  },
  personWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    color: '#464C4E',
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'left'
  },
  personAvatar: {
    height: '32px',
    wdith: '32px',
    borderRadius: '16px',
    marginRight: '9px'
  },
  personName: {
    marginRight: '5px',
    wordBreak: 'break-all',
    flex: '1'
  },
  personSelectWrapper: {
    marginRight: '10px',
    '&:before': {
      border: 'none!important'
    },
    '&:hover:before': {
      borderBottom: 'none!important'
    },
    '&:after': {
      borderBottom: 'none!important'
    }
  },
  personSelectRoot: {
    height: '34px',
    width: '60px',
    backgroundColor: '#F8F9FC',
    borderRadius: '4px',
    border: '1px solid #D2D5DB',
    paddingLeft: '10px'
  },
  personSelect: {
    paddingRight: '20px',
    '&:focus': {
      background: 'none'
    }
  },
  personvotesInPercent: {
    marginLeft: '10px'
  },
  personVotes: {
    wordBreak: 'break-word',
    width: '20%',
    textAlign: 'right'
  },
  btnEdit: {
    padding: '0',
    width: '168px',
    minHeight: '50px',
    backgroundColor: 'white',
    borderRadius: '4px',
    border: '1px solid #01A78D',
    color: '#01A78D',
    fontSize: '18px',
    fontWeight: '500'
  },
  btnCancel: {
    width: '45%',
    minHeight: '50px',
    backgroundColor: 'white',
    borderRadius: '4px',
    border: '1px solid #01A78D',
    color: '#01A78D',
    fontSize: '18px',
    fontWeight: '500',
    marginRight: '10%'
  },
  btnVote: {
    width: '45%',
    height: '50px',
    color: 'white',
    backgroundColor: '#01A78D',
    fontSize: '18px',
    fontWeight: '500'
  },
  btnVoteDisabled: {
    width: '45%',
    height: '50px',
    color: 'white',
    backgroundColor: '#D6D6D6',
    fontSize: '18px',
    fontWeight: '500'
  },
  personClose: {
    marginLeft: '18px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  close: {
    position: 'absolute',
    right: '10px',
    top: '8px',
    fontSize: '20px',
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

export default withStyles(style)(ProxyVotingComponent)
