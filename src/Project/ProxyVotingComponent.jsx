import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import numeral from 'numeral'
import classNames from 'classnames'
import update from 'immutability-helper'

class ProxyVotingComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isVoting: false,
      selectedValidatorActors: [],
      validatorPercentMap: {},
      sort: 'vote',
      voteStep: 0,
      keyword: '',
      showSearch: false
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

  formatVote = (pct) => {
    if (this.props.voteInfo.votes * pct % 100 === 0) {
      return this.props.voteInfo.votes * pct / 100
    } else {
      return numeral(this.props.voteInfo.votes * pct / 100).format('0.0a')
    }
  }

  usedPercent = () => {
    var proxyList = this.props.voteInfo.proxyList || []
    var usedPercent = 0
    if (this.state.voteStep === 0) {
      proxyList.forEach((proxy) => {
        usedPercent += proxy.pct
      })
    } else if (this.state.voteStep === 1) {
      this.state.selectedValidatorActors.forEach((actor) => {
        usedPercent += this.state.validatorPercentMap[actor]
      })
    }
    return usedPercent
  }

  calcAvailableVotes = () => {
    var votes = this.props.voteInfo.votes || 0
    var usedPercent = this.usedPercent()
    return numeral(votes * (100 - usedPercent) / 100).format('0a')
  }

  togglePerson = (actor) => {
    if (this.state.isVoting) return
    if (this.state.selectedValidatorActors.indexOf(actor) >= 0) {
      this.removePerson(actor)
    } else {
      this.setState({
        selectedValidatorActors: update(this.state.selectedValidatorActors, { $push: [actor] }),
        validatorPercentMap: update(this.state.validatorPercentMap, { [actor]: { $set: 0 } })
      })
    }
  }

  removePerson = (actor) => {
    if (this.state.isVoting) return
    this.setState({
      selectedValidatorActors: update(this.state.selectedValidatorActors, { $splice: [[this.state.selectedValidatorActors.indexOf(actor), 1]] })
    })
  }

  changePercent = (actor, e) => {
    this.setState({
      validatorPercentMap: update(this.state.validatorPercentMap, { [actor]: { $set: e.target.value } })
    })
  }

  edit = () => {
    let selectedValidatorActors = []
    let validatorPercentMap = {}
    for (let item of this.props.voteInfo.proxyList) {
      selectedValidatorActors.push(item.actor)
      validatorPercentMap[item.actor] = item.pct
    }
    this.setState({
      voteStep: 1,
      selectedValidatorActors,
      validatorPercentMap
    })
  }

  getAvailablePercent = (oldValue = 0) => {
    let result = []
    for (let pct = 0; pct <= (100 - this.usedPercent() + oldValue); pct += 10) {
      result.push(pct)
    }
    return result
  }

  vote = () => {
    this.setState({
      isVoting: true
    })
    console.log('vote')
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
    for (let validator of this.props.validators) {
      if (validator.actor === actor) {
        return validator
      }
    }
    return null
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  getVoteDom = () => {
    const { classes, voteInfo } = this.props
    const { isVoting, selectedValidatorActors, voteStep, validatorPercentMap } = this.state

    if (!voteInfo) {
      return null
    } else {
      return (
        <Grid item xs={12} md={4}>
          <div className={classNames(classes.voteWrapper, { [classes.isVoting]: isVoting })}>
            <div className={classes.voteTitle}>My votes ({this.calcAvailableVotes()}/{voteInfo.votes} available)</div>
            {voteStep === 0 && !voteInfo.proxyList &&
              <div>
                <div className={classes.voteText}>Start voting for your validators now!</div>
                <img src='/vote-1.png' alt='' className={classes.voteImage} />
                <Button onClick={() => this.setState({ voteStep: 1 })} className={classes.btnStartVoting}>
                  Start Voting
                </Button>
              </div>
            }
            {voteStep === 0 && voteInfo.proxyList &&
              <div>
                {voteInfo.proxyList.map((item, i) => {
                  let targetValidator = this.actorToValidator(item.actor)
                  return (
                    <div className={classes.personWrapper} key={i}>
                      <img className={classes.personAvatar} src={targetValidator.photoUrl} alt='' />
                      <div className={classes.personName}>{targetValidator.username}</div>
                      <div className={classes.personPct}>{item.pct}%</div>
                      <div>({this.formatVote(item.pct)} Votes)</div>
                    </div>
                  )
                })}
                <Button onClick={this.edit} className={classes.btnEdit}>
                  Edit my votes
                </Button>
              </div>
            }
            {voteStep === 1 &&
              <div>
                <div className={classes.voteText}>{selectedValidatorActors.length === 0 ? 'Select your validator(s) from the left' : 'Edit your votes'}</div>
                {selectedValidatorActors.length === 0 &&
                  <img src='/vote-2.png' alt='' className={classes.voteImage} />
                }
                {selectedValidatorActors.length > 0 &&
                  selectedValidatorActors.map((actor, i) => {
                    let validator = this.actorToValidator(actor)

                    return (
                      <div className={classes.personWrapper} key={i}>
                        <div className={classes.personName}>{validator.username}</div>
                        <Select
                          className={classes.personSelectWrapper}
                          classes={{ root: classes.personSelectRoot, select: classes.personSelect }}
                          value={validatorPercentMap[actor]}
                          onChange={(e) => {
                            this.changePercent(actor, e)
                          }}
                        >
                          {this.getAvailablePercent(validatorPercentMap[actor]).map((val, i) => <MenuItem key={val} value={val}>{val}%</MenuItem>)}
                        </Select>
                        <div className={classes.personVote}>{this.formatVote(validatorPercentMap[actor])} Votes</div>
                        <i onClick={() => { this.removePerson(actor) }} className={classNames('fas', 'fa-times-circle', classes.personClose)} />
                      </div>
                    )
                  })
                }
                <Button onClick={() => this.setState({ voteStep: 0 })} className={classes.btnCancel}>
                  Cancel
                </Button>
                <Button onClick={this.vote} className={classNames({ [classes.btnVote]: selectedValidatorActors.length !== 0, [classes.btnVoteDisabled]: selectedValidatorActors.length === 0 })}>
                  {isVoting ? <CircularProgress className={classes.progress} classes={{ svg: classes.progressSvg }} /> : 'Vote'}
                </Button>
              </div>
            }
          </div>
        </Grid>
      )
    }
  }

  render () {
    const { classes, validators } = this.props
    const { selectedValidatorActors, sort, voteStep, keyword, showSearch } = this.state

    let displayValidators = validators
    if (showSearch) {
      let lcKeyword = keyword.toLowerCase()
      displayValidators = displayValidators.filter((validator) => {
        let targetProperties = ['username', 'description']
        for (let name of targetProperties) {
          if (validator[name].toLowerCase().indexOf(lcKeyword) >= 0) {
            return true
          }
        }
        return false
      })
    } else {
      displayValidators.sort((a, b) => {
        if (sort === 'vote') {
          return b.proxyVoting.receivedVotes - a.proxyVoting.receivedVotes
        } else {
          return b.reputation - a.reputation
        }
      })
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction='row' className={classes.proxyVoting} justify='center'>
          <Grid item xs={10}>
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
                          inputProps={{ className: classes.searchInput }}
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
                            <div className={classes.validatorName}>{validator.username}</div>
                            <div className={classes.validatorDesc}>{validator.description}</div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.verticalCenter}>
                          <div className={classes.block}>
                            <div className={classes.value}>{validator.reputation}</div>
                            <div>Reputation</div>
                          </div>
                          <div className={classes.block}>
                            <div className={classes.value}>{this.formatNumber(validator.proxyVoting.receivedVotes)}</div>
                            <div>Votes</div>
                          </div>
                          {voteStep === 1 &&
                            <div>
                              <Checkbox
                                classes={{ root: classes.checkbox }}
                                checked={selectedValidatorActors.indexOf(validator.actor) >= 0}
                                onChange={() => this.togglePerson(validator.actor)}
                                color='primary'
                              />
                            </div>
                          }
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
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  proxyVoting: {
    marginTop: '40px',
    fontFamily: 'Helvetica Neue'
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
    padding: '40px',
    textAlign: 'center'
  },
  isVoting: {
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
    marginBottom: '40px'
  },
  btnStartVoting: {
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
    backgroundColor: '#F8F9FC',
    borderRadius: '4px',
    border: '1px solid #D2D5DB',
    paddingLeft: '10px'
  },
  personSelect: {
    paddingRight: '20px'
  },
  personPct: {
    marginLeft: '10px'
  },
  btnEdit: {
    width: '168px',
    height: '50px',
    backgroundColor: 'white',
    borderRadius: '4px',
    border: '1px solid #01A78D',
    color: '#01A78D',
    fontSize: '18px',
    fontWeight: '500',
    marginRight: '10%'
  },
  btnCancel: {
    width: '45%',
    height: '50px',
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
  }
})

export default withStyles(theme)(ProxyVotingComponent)
