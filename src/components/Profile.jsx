import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import logo from '../logo.svg'

let contentColor = '#666666'

const styles = {
  bar: {
    color: contentColor,
    height: '60px',
    padding: '0 60px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FBFAFC',
    boxShadow: '0 2px 4px 0 #D3D0D5',
    '@media (max-width: 375px)': {
      padding: '0 30px'
    }
  },
  logo: {
    height: '32px'
  },
  user: {
    display: 'flex',
    alignItems: 'center'
  },
  username: {
    marginLeft: '10px',
    color: contentColor,
    '@media (max-width: 375px)': {
      display: 'none'
    }
  },
  avatar: {
    height: '32px',
    width: '32px',
    borderRadius: '4px'
  },
  bigAvatar: {
    height: '100px',
    width: '100px',
    marginRight: '30px',
    borderRadius: '4px',
    '@media (max-width: 375px)': {
      height: '64px',
      width: '64px',
      marginRight: '20px'
    }
  },
  exitIcon: {
    marginLeft: '70px',
    color: contentColor
  },
  menu: {
    boxShadow: '0 2px 4px 0 rgba(233,233,233,0.5)',
  },
  item: {
    padding: '20px'
  },
  bottomLine: {
    height: '1px',
    backgroundColor: '#E9E9E9',
    marginLeft: '20px',
    marginRight: '20px'
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
    '@media (max-width: 375px)': {
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
    '@media (max-width: 375px)': {
      marginTop: '4px'
    }
  },
  points: {
    lineHeight: '32px',
    fontSize: '32px',
    fontWeight: 'bold',
    '@media (max-width: 375px)': {
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
    '@media (max-width: 375px)': {
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
    marginTop: '20px',
    marginBottom: '-20px',
    border: 'none',
    backgroundColor: 'white',
    boxShadow: 'none'
  },
  mobileTab: {
    color: '#999999',
    display: 'none',
    '@media (max-width: 375px)': {
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
    '@media (max-width: 375px)': {
      marginTop: '0'
    }
  },
  listItem: {
    paddingRight: '15%',
    position: 'relative',
    marginTop: '21px',
    paddingTop: '19px',
    borderTop: '2px solid #E9E9E9'
  },
  title: {
    color: '#333333',
    fontSize: '14px',
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
  }
}

class Profile extends Component {
  state = {
    open: false,
    tabIndex: 0,
    list: [
      {
        title: 'Upvoted a post from @santi',
        text: 'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services. With the advent of search....',
        date: '2018-08-19',
        gain: 96
      }, {
        title: 'Upvoted a post from @santi',
        text: 'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services. With the advent of search....',
        date: '2018-08-19',
        gain: 96
      }, {
        title: 'Upvoted a post from @santi',
        text: 'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services. With the advent of search....',
        date: '2018-08-19',
        gain: 96
      }, {
        title: 'Upvoted a post from @santi',
        text: 'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services. With the advent of search....',
        date: '2018-08-19',
        gain: 96
      }, {
        title: 'Upvoted a post from @santi',
        text: 'In today’s net-savvy world it has become common for any business to have a website which they use mostly for advertising their products and services. With the advent of search....',
        date: '2018-08-19',
        gain: 96
      }
    ]
  }

  handleMenu = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e, value) => {
    this.setState({ tabIndex: value })
  }

  render() {
    const { classes } = this.props
    const { open, tabIndex, list } = this.state

    return (
      <div>
        <AppBar classes={{root: classes.bar}}>
          <img className={classes.logo} src={logo} alt='' />
          <div className={classes.user}>
            <img className={classes.avatar} src='https://image.ibb.co/fzwtPe/rect_avatar.png' alt='' onClick={this.handleMenu} />
            <Typography variant='body2' className={classes.username}>
              william
            </Typography>
          </div>
          <Menu
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
            classes={{paper: classes.menu}}
            MenuListProps={{disablePadding: true}}
          >
            <MenuItem classes={{root: classes.item}} onClick={this.handleClose}>
              <img className={classes.avatar} src='https://image.ibb.co/fzwtPe/rect_avatar.png' alt='' onClick={this.handleMenu} />
              <Typography variant='body2' className={classes.username}>
                william
              </Typography>
            </MenuItem>
            <div className={classes.bottomLine} />
            <MenuItem classes={{root: classes.item}} onClick={this.handleClose}>
              <Typography variant='body1'>
                Log out
              </Typography>
              <ExitToApp className={classes.exitIcon} /></MenuItem>
          </Menu>
        </AppBar>
        <Grid container className={classes.content}>
          <Grid container className={classes.card}>
            <Grid item>
              <img className={classes.bigAvatar} src='https://image.ibb.co/fzwtPe/rect_avatar.png' alt='' />
            </Grid>
            <Grid item>
              <Typography variant='headline'>
                william
              </Typography>
              <div className={classes.level}>
                Lv 1
              </div>
            </Grid>
            <div className={classes.empty} />
            <Grid item md={3} xs={12}>
              <div className={classes.points}>
                10,000
              </div>
              <div className={classes.pointsLabel}>
                Milestone Points
              </div>
            </Grid>
          </Grid>
          <AppBar classes={{root: classes.mobileTabBar}} position="static">
            <Tabs classes={{root: classes.mobileTab, flexContainer: classes.tabFlex, indicator: classes.mobileTabIndicator}} value={tabIndex} onChange={this.handleChange}>
              {['VOTING(71)', 'POST(8)', 'REPLY(237)'].map((label, i) => {
                return <Tab key={i} classes={{root: classes.mobileTabButton, label: classes.mobileTabLabel, selected: classes.mobileTabButtonSelected}} label={label} />
              })}
            </Tabs>
          </AppBar>
          <Grid container className={classes.card}>
            <AppBar classes={{root: classes.tabBar}} position="static">
              <Tabs classes={{root: classes.tab, flexContainer: classes.tabFlex, indicator: classes.tabIndicator}} value={tabIndex} onChange={this.handleChange}>
                {['VOTING(71)', 'POST(8)', 'REPLY(237)'].map((label, i) => {
                  return <Tab key={i} classes={{root: classes.tabButton, labelContainer: classes.tabLabelContainer, label: classes.tabLabel, selected: classes.tabButtonSelected}} label={label} />
                })}
              </Tabs>
            </AppBar>
            {tabIndex === 0 &&
              <div>
                <div className={classes.header}>
                  <div>
                    VOTING
                    <div className={classes.floatRight}>
                      GAIN
                    </div>
                  </div>
                </div>
                {list.map((item, i) => {
                  return (
                    <div key={i} className={classes.listItem}>
                      <div className={classes.title}>
                        {item.title}
                      </div>
                      <div className={classes.text}>
                        {item.text}
                      </div>
                      <div className={classes.date}>
                        {item.date}
                      </div>
                      <div className={classes.gain}>
                        {item.gain}
                      </div>
                    </div>
                  )
                })}
              </div>
            }
            {tabIndex === 1 &&
              <div>
                <div className={classes.header}>
                  <div>
                    POST
                    <div className={classes.floatRight}>
                      GAIN
                    </div>
                  </div>
                </div>
                {list.map((item, i) => {
                  return (
                    <div key={i} className={classes.listItem}>
                      <div className={classes.title}>
                        {item.title}
                      </div>
                      <div className={classes.text}>
                        {item.text}
                      </div>
                      <div className={classes.date}>
                        {item.date}
                      </div>
                      <div className={classes.gain}>
                        {item.gain}
                      </div>
                    </div>
                  )
                })}
              </div>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Profile)
