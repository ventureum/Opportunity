import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ExitToApp from '@material-ui/icons/ExitToApp'
import logo from '../logo.svg'

class NavBarComponent extends Component {
  state = {
    open: false
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

  render () {
    const { classes, userInfo } = this.props
    const { open } = this.state
    const anchorEl = window.document.querySelector('header')

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar classes={{ root: classes.bar }}>
          <div className={classes.logoWrapper}>
            <img className={classes.logo} src={logo} alt='' />
            <Typography className={classes.logoText}>
              Milestone
            </Typography>
          </div>
          <div className={classes.user} onClick={this.handleOpen}>
            <img className={classes.avatar} src={userInfo.photo_url} alt='' />
            <Typography variant='body2' className={classes.username}>
              {userInfo.username}
            </Typography>
          </div>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={open}
            onClose={this.handleClose}
            classes={{ paper: classes.menu }}
            MenuListProps={{ disablePadding: true }}
          >
            <MenuItem onClick={this.handleClose}>
              <Link to='/my-projects' className={classes.link}>
                <Typography variant='body1'>
                  My Projects
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <Link to='/' className={classes.link}>
                <Typography variant='body1'>
                  Account Settings&nbsp;
                </Typography>
              </Link>
            </MenuItem>
            <div className={classes.bottomLine} />
            <MenuItem className={classes.logout} onClick={this.logout}>
              <Typography variant='body1'>
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
  }
})

export default withStyles(theme)(NavBarComponent)
