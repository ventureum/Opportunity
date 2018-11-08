import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import numeral from 'numeral'

const styles = {
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  bigAvatar: {
    height: '100px',
    width: '100px',
    marginRight: '30px',
    borderRadius: '4px',
    '@media (max-width: 500px)': {
      height: '64px',
      width: '64px',
      marginRight: '20px'
    }
  },
  content: {
    marginTop: '60px',
    width: '100%',
    padding: '0 16.6%',
    '@media (max-width: 1024px)': {
      padding: '0'
    }
  },
  card: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px 0 rgba(233,233,233,0.5)',
    padding: '60px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    maxWidth: '960px',
    margin: '0 auto',
    '@media (max-width: 1024px)': {
      maxWidth: '100%'
    },
    '@media (max-width: 500px)': {
      padding: '30px'
    }
  },
  level: {
    padding: '4px 7px',
    borderRadius: '4px',
    backgroundColor: '#A3216E',
    marginTop: '10px',
    fontSize: '12px',
    lineHeight: '12px',
    textAlign: 'center',
    display: 'inline-block',
    color: 'white',
    '@media (max-width: 500px)': {
      marginTop: '4px'
    }
  },
  points: {
    lineHeight: '32px',
    fontSize: '32px',
    fontWeight: 'bold',
    '@media (max-width: 500px)': {
      marginTop: '30px'
    }
  },
  pointsLabel: {
    marginTop: '5px',
    fontSize: '18px',
    color: '#999999',
    fontWeight: '100'
  },
  empty: {
    flex: '1'
  },
  tabBar: {
    border: 'none',
    backgroundColor: 'inherit',
    boxShadow: 'none'
  },
  tab: {
    width: '70%',
    color: '#999999',
    padding: '0 15%',
    marginTop: '-11px',
    '@media (max-width: 500px)': {
      display: 'none'
    }
  },
  tabFlex: {
    justifyContent: 'space-between'
  },
  tabButton: {
    padding: '11px 0'
  },
  tabLabelContainer: {
    padding: '0'
  },
  tabLabel: {
    lineHeight: '18px',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  tabButtonSelected: {
    color: '#333333'
  },
  tabIndicator: {
    backgroundColor: '#333333'
  },
  mobileTabBar: {
    zIndex: '0',
    marginTop: '20px',
    marginBottom: '-20px',
    border: 'none',
    backgroundColor: 'white',
    boxShadow: 'none'
  },
  mobileTab: {
    color: '#999999',
    display: 'none',
    '@media (max-width: 500px)': {
      display: 'block'
    }
  },
  mobileTabButton: {
    width: '33.3%'
  },
  mobileTabLabel: {
    lineHeight: '16px',
    fontSize: '14px',
    fontWeight: '100'
  },
  mobileTabButtonSelected: {
    color: '#5D1049'
  },
  mobileTabIndicator: {
    height: '1px',
    backgroundColor: '#5D1049'
  },
  header: {
    color: '#777777',
    fontSize: '14px',
    marginBottom: '8px',
    marginTop: '29px',
    '@media (max-width: 500px)': {
      marginTop: '0'
    }
  },
  listItem: {
    paddingRight: '10%',
    position: 'relative',
    marginTop: '21px',
    paddingTop: '19px',
    borderTop: '2px solid #E9E9E9',
    wordBreak: 'break-all',
    '@media (max-width: 500px)': {
      paddingRight: '15%'
    }
  },
  title: {
    color: '#333333',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  postTitle: {
    color: '#333333',
    fontSize: '18px',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  text: {
    color: '#333333',
    fontSize: '14px'
  },
  date: {
    color: '#777777',
    fontSize: '12px',
    marginTop: '10px'
  },
  floatRight: {
    float: 'right'
  },
  gain: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333333',
    position: 'absolute',
    right: '0',
    top: '19px'
  },
  tabContent: {
    width: '100%'
  }
}

class ProfileComponent extends Component {
  state = {
    tabIndex: 0,
    voteList: null,
    postList: null,
    replyList: null
  }

  componentDidMount () {
    this.props.getProfile(this.props.userInfo.username).then(() => {
      this.props.getVoteList(this.props.userInfo.username)
      this.props.getPostList(this.props.userInfo.username)
      this.props.getReplyList(this.props.userInfo.username)
    })
  }

  handleChange = (event, value) => {
    this.setState({ tabIndex: value })
  }

  getLabelText (label) {
    let tabMap = {
      VOTINGS: 'voteList',
      POSTS: 'postList',
      REPLIES: 'replyList'
    }
    if (this.props[tabMap[label]]) {
      return `${label}(${this.props[tabMap[label]].length})`
    } else {
      return `${label}(0)`
    }
  }

  formatNumber (number, needSign = true) {
    number = number / 100
    let result
    if (number <= 1000) {
      number = parseInt(number).toString()
      result = numeral(number).format('0,0a')
    } else {
      result = numeral(number).format('0,0.00a')
    }
    if (needSign && number > 0) {
      return '+' + result
    }
    return result
  }

  render () {
    const { classes, userInfo, profile, voteList, postList, replyList } = this.props
    const { tabIndex } = this.state

    return (
      <div>
        <Grid container className={classes.content}>
          <Grid container className={classes.card}>
            <Grid item>
              <img className={classes.bigAvatar} src={userInfo.photo_url} alt='' />
            </Grid>
            <Grid item>
              <Typography variant='h5'>
                {userInfo.username}
              </Typography>
              <div className={classes.level}>
                Lv {profile && profile.level}
              </div>
            </Grid>
            <div className={classes.empty} />
            <Grid item xs={12} sm={3}>
              <div className={classes.points}>
                {this.formatNumber(profile ? profile.rewardsInfo.milestonePoints : 0, false)}
              </div>
              <div className={classes.pointsLabel}>
                Milestone Points
              </div>
            </Grid>
          </Grid>
          <AppBar classes={{ root: classes.mobileTabBar }} position='static'>
            <Tabs classes={{ root: classes.mobileTab, flexContainer: classes.tabFlex, indicator: classes.mobileTabIndicator }} value={tabIndex} onChange={this.handleChange}>
              {['VOTINGS', 'POSTS', 'REPLIES'].map((label, i) => {
                return <Tab key={i} classes={{ root: classes.mobileTabButton, label: classes.mobileTabLabel, selected: classes.mobileTabButtonSelected }} label={this.getLabelText(label)} />
              })}
            </Tabs>
          </AppBar>
          <Grid container className={classes.card}>
            <AppBar classes={{ root: classes.tabBar }} position='static'>
              <Tabs classes={{ root: classes.tab, flexContainer: classes.tabFlex, indicator: classes.tabIndicator }} value={tabIndex} onChange={this.handleChange}>
                {['VOTINGS', 'POSTS', 'REPLIES'].map((label, i) => {
                  return <Tab key={i} classes={{ root: classes.tabButton, labelContainer: classes.tabLabelContainer, label: classes.tabLabel, selected: classes.tabButtonSelected }} label={this.getLabelText(label)} />
                })}
              </Tabs>
            </AppBar>
            {tabIndex === 0 &&
              <div className={classes.tabContent}>
                <div className={classes.header}>
                  <div>
                    VOTINGS
                    <div className={classes.floatRight}>
                      POINTS
                    </div>
                  </div>
                </div>
                {voteList && voteList.map((item, i) => {
                  return (
                    <div key={i} className={classes.listItem}>
                      <div className={classes.title}>
                        {item.voteType === 'DOWN' ? 'Downvoted @' : 'Upvoted @'}{item.actor}
                      </div>
                      <div className={classes.text}>
                        {item.content.text}
                      </div>
                      <div className={classes.date}>
                        {item.createdAt.split('T')[0]}
                      </div>
                      <div className={classes.gain}>
                        {this.formatNumber(item.deltaMilestonePoints)}
                      </div>
                    </div>
                  )
                })}
                {!voteList &&
                  <div className={classes.listItem}>
                    <div className={classes.text}>
                      No recent data available.
                    </div>
                  </div>
                }
              </div>
            }
            {tabIndex === 1 &&
              <div className={classes.tabContent}>
                <div className={classes.header}>
                  <div>
                    POSTS
                    <div className={classes.floatRight}>
                      POINTS
                    </div>
                  </div>
                </div>
                {postList && postList.map((item, i) => {
                  return (
                    <div key={i} className={classes.listItem}>
                      <div className={classes.postTitle}>
                        {item.content.title}
                      </div>
                      <div className={classes.text}>
                        {item.content.text}
                      </div>
                      <div className={classes.date}>
                        {item.createdAt.split('T')[0]}
                      </div>
                      <div className={classes.gain}>
                        {this.formatNumber(item.deltaMilestonePoints)}
                      </div>
                    </div>
                  )
                })}
                {!postList &&
                  <div className={classes.listItem}>
                    <div className={classes.text}>
                      No recent data available.
                    </div>
                  </div>
                }
              </div>
            }
            {tabIndex === 2 &&
              <div className={classes.tabContent}>
                <div className={classes.header}>
                  <div>
                    REPLIES
                    <div className={classes.floatRight}>
                      POINTS
                    </div>
                  </div>
                </div>
                {replyList && replyList.map((item, i) => {
                  return (
                    <div key={i} className={classes.listItem}>
                      <div className={classes.title}>
                        Replied @{item.actor}
                      </div>
                      <div className={classes.text}>
                        {item.content.text}
                      </div>
                      <div className={classes.date}>
                        {item.createdAt.split('T')[0]}
                      </div>
                      <div className={classes.gain}>
                        {this.formatNumber(item.deltaMilestonePoints)}
                      </div>
                    </div>
                  )
                })}
                {!replyList &&
                  <div className={classes.listItem}>
                    <div className={classes.text}>
                      No recent data available.
                    </div>
                  </div>
                }
              </div>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ProfileComponent)
