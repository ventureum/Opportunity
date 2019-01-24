import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import ExitToApp from '@material-ui/icons/ExitToApp'
import logo from '../logo.svg'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'

// To get rid of Typography v2 warning
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class NavBarComponent extends Component {
  state = {
    open: false,
    redirectTo: ''
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  logout = () => {
    this.props.logout()
    this.handleClose()
  }

  login = () => {
    this.props.history.push('/login')
  }

  handleRedirect = (to) => {
    if (to !== this.props.location.pathname) {
      this.setState({ redirectTo: to })
    } else {
      this.handleClose()
    }
  }

  render () {
    const { classes, location } = this.props
    var { profile } = this.props
    const { open, redirectTo } = this.state
    const anchorEl = window.document.querySelector('header')

    if (redirectTo) {
      return (<Redirect push to={redirectTo} />)
    }

    return (
      <AppBar position='static' color='default'>
        <Grid container direction='row' justify='space-between' alignItems='center' spacing={0} className={classes.bar}>
          <Grid item>
            <Link to='/' className={classes.link}>
              <div className={classes.logoWrapper}>
                <img className={classes.logo} src={logo} alt='' />
                <Typography className={classes.logoText}>
                  Milestone
                </Typography>
              </div>
            </Link>
          </Grid>
          <Grid xs={5} item >
            <List className={classes.tabList}>
              <Link to='/' className={classes.tabItem}>
                <Typography className={location.pathname === '/' ? classes.tabItemTextSelected : classes.tabItemTextDefault}>
                  Projects
                </Typography>
              </Link>
              <Link to='/validators' className={classes.tabItem}>
                <Typography className={location.pathname === '/validators' ? classes.tabItemTextSelected : classes.tabItemTextDefault}>
                  Validators
                </Typography>
              </Link>
            </List>
          </Grid>
          <Grid item>
            <div className={classes.user} onClick={this.handleOpen}>
              {profile.photoUrl && <Avatar src={profile.photoUrl} className={classes.avatar} />}
              {!profile.photoUrl && <Avatar className={classes.avatar}> {profile.username.charAt(0)} </Avatar>}
              <Typography className={classes.username}>
                {profile.username}
              </Typography>
            </div>
            <Menu
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              open={open}
              onClose={this.handleClose}
              classes={{ paper: classes.menu }}
              MenuListProps={{ disablePadding: true }}
            >
              {(profile.actorType === 'PF' || profile.actorType === 'KOL') &&
                <MenuItem>
                  {profile.actorType === 'KOL' && <Chip label='Validator' className={classes.userTypeValidatorChip} />}
                  {profile.actorType === 'PF' && <Chip label='Project Founder' className={classes.userTypeProjectFounderChip} />}
                </MenuItem>
              }
              {(profile.actorType === 'USER' || profile.actorType === 'KOL') &&
                <MenuItem onClick={() => this.handleRedirect('/my-projects')}>
                  <Typography variant='body2'>
                    My Projects
                  </Typography>
                </MenuItem>
              }
              {profile.actorType === 'PF'
                ? <MenuItem onClick={() => this.handleRedirect('/project-management')}>
                  <Typography variant='body2'>
                    Project Management
                  </Typography>
                </MenuItem>
                : null
              }
              {profile.actorType !== 'ANONYMOUS' &&
                <MenuItem onClick={() => this.handleRedirect('/')}>
                  <Typography variant='body2'>
                    Account Settings&nbsp;
                  </Typography>
                </MenuItem>
              }
              <div className={classes.bottomLine} />
              {profile.actorType === 'ANONYMOUS' &&
                <MenuItem className={classes.logout} onClick={this.login}>
                  <Typography variant='body2'>
                    Log in
                  </Typography>
                </MenuItem>
              }
              {profile.actorType !== 'ANONYMOUS' &&
                <MenuItem className={classes.logout} onClick={this.logout}>
                  <Typography variant='body2'>
                    Log out
                  </Typography>
                  <ExitToApp className={classes.exitIcon} />
                </MenuItem>
              }
            </Menu>
          </Grid>
        </Grid>
      </AppBar>
    )
  }
}

const style = theme => ({
  bar: {
    padding: '14px 30px 14px 30px'
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    height: '27px',
    marginRight: '10px'
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  username: {
    marginLeft: '10px',
    height: '15px',
    color: '#666666',
    fontSize: '12px',
    fontWeight: '500',
    '@media (max-width: 500px)': {
      display: 'none'
    }
  },
  avatar: {
    height: '32px',
    width: '32px',
    borderRadius: '16px'
  },
  logout: {
    justifyContent: 'space-between'
  },
  exitIcon: {
    float: 'right',
    display: 'block'
  },
  link: {
    color: '#333333',
    textDecoration: 'none',
    display: 'block'
  },
  menu: {
    top: '50px!important',
    color: '#333333',
    boxShadow: '0 2px 4px 0 #D3D0D5'
  },
  bottomLine: {
    height: '1px',
    backgroundColor: '#E9E9E9'
  },
  userTypeValidatorChip: {
    backgroundColor: '#01A78D',
    color: 'white'
  },
  userTypeProjectFounderChip: {
    backgroundColor: '#0C87CD',
    color: 'white'
  },
  logoText: {
    fontWeight: '500',
    lineHeight: '27px',
    letterSpacing: '0.29px',
    fontSize: '18px',
    '@media (max-width: 600px)': {
      display: 'none'
    }
  },
  tabList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabItem: {
    marginRight: '40px',
    color: '#333333',
    textDecoration: 'none',
    display: 'block'
  },
  tabItemTextSelected: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#008080'
  },
  tabItemTextDefault: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333333'
  }
})

export default withStyles(style)(NavBarComponent)
