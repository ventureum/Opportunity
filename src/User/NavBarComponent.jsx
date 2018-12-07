import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Avatar from '@material-ui/core/Avatar'
import ExitToApp from '@material-ui/icons/ExitToApp'
import logo from '../logo.svg'
import Chip from '@material-ui/core/Chip'
import ButtonBase from '@material-ui/core/ButtonBase'

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

  handleRedirect = (to) => {
    if (to !== this.props.location.pathname) {
      this.setState({redirectTo: to})
    } else {
      this.handleClose()
    }
  }

  render () {
    const { classes, profile } = this.props
    const { open, redirectTo } = this.state
    const anchorEl = window.document.querySelector('header')

    if (redirectTo) {
      return (<Redirect push to={redirectTo} />)
    }

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar classes={{ root: classes.bar }}>
          <Link to='/' className={classes.link}>
            <div className={classes.logoWrapper}>
              <img className={classes.logo} src={logo} alt='' />
              <Typography className={classes.logoText}>
              Milestone
              </Typography>
            </div>
          </Link>
          <div className={classes.user} onClick={this.handleOpen}>
            { profile.photoUrl && <Avatar src={profile.photoUrl} className={classes.avatar} /> }
            { !profile.photoUrl && <Avatar className={classes.avatar}> {profile.username.charAt(0)} </Avatar> }
            <Typography variant='body1' className={classes.username}>
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
            {profile.actorType !== 'USER'
              ? <MenuItem>
                { profile.actorType === 'KOL' && <Chip label='Validator' className={classes.userTypeValidatorChip} /> }
                { profile.actorType === 'PF' && <Chip label='Project Founder' className={classes.userTypeProjectFounderChip} /> }
              </MenuItem>
              : null
            }
            <MenuItem onClick={() => this.handleRedirect('/my-projects')}>
              <Typography variant='body2'>
                  My Projects
              </Typography>
            </MenuItem>
            {profile.actorType !== 'USER'
              ? <MenuItem onClick={() => this.handleRedirect('/project-management')}>
                <Typography variant='body2'>
                  Project Management
                </Typography>
              </MenuItem>
              : null
            }
            <MenuItem onClick={() => this.handleRedirect('/')}>
              <Typography variant='body2'>
                  Account Settings&nbsp;
              </Typography>
            </MenuItem>
            <div className={classes.bottomLine} />
            <MenuItem className={classes.logout} onClick={this.logout}>
              <Typography variant='body2'>
                Log out
              </Typography>
              <ExitToApp className={classes.exitIcon} />
            </MenuItem>
          </Menu>
        </AppBar>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  bar: {
    position: 'relative',
    color: 'white',
    height: '60px',
    padding: '0 60px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 4px 0 #D3D0D5',
    '@media (max-width: 500px)': {
      padding: '0 30px'
    }
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    height: '32px',
    marginRight: '10px'
  },
  lotoText: {
    fontSize: '15px'
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
    fontWeight: '400',
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
  }
})

export default withStyles(theme)(NavBarComponent)
