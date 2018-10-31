import React, { Component } from 'react'
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddWallet from './AddWalletComponent'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import classNames from 'classnames'

class WalletListComponent extends Component {
  state = {
    modalOpen: false,
    dialogOpen: false,
    selectedAddress: ''
  }

  handleOpen = (name, addr) => {
    if (name === 'dialog') {
      this.setState({
        selectedAddress: addr
      })
    }
    this.setState({
      [name + 'Open']: true
    })
  }

  handleClose = (name) => {
    this.setState({
      [name + 'Open']: false
    })
  }

  removeAddress = () => {
    this.handleClose('dialog')
    this.props.removeWallet(this.state.selectedAddress)
  }

  render () {
    const { classes, walletAddress, addWallet, handleClose } = this.props
    const { modalOpen, dialogOpen } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root} onClick={(e) => e.stopPropagation()}>
          <Grid container direction='row' className={classes.walletListWrapper}>
            <Grid item className={classes.title} xs={12}>
              Manage Wallets
            </Grid>
            <Grid item className={classes.subTitle} xs={12}>
              Wallet Address
            </Grid>
            {walletAddress.map(addr => {
              return (
                <Grid item className={classes.addressWrapper} key={addr} xs={12}>
                  <Grid container direction='row' alignItems='center'>
                    <Grid item className={classes.address} xs={9}>
                      {addr}
                    </Grid>
                    <Grid item className={classes.icons} xs={3}>
                      <Tooltip title='View Account on Ether'>
                        <a href={'https://etherscan.io/search?q=' + addr} target='_blank' rel='noopener noreferrer'>
                          <i className={classNames('fas', 'fa-external-link-alt', classes.iconOpen)} />
                        </a>
                      </Tooltip>
                      <i onClick={() => this.handleOpen('dialog', addr)} className={classNames('fas', 'fa-trash', classes.iconRemove)} />
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
            <Grid item xs={12}>
              <Button className={classes.btnAdd} onClick={() => this.handleOpen('modal')}>Add Wallet</Button>
              <Modal
                disableRestoreFocus
                disableEnforceFocus
                disableAutoFocus
                open={modalOpen}
                onClose={() => this.handleClose('modal')}
              >
                <AddWallet handleClose={() => this.handleClose('modal')} addWallet={addWallet} />
              </Modal>
            </Grid>
            <div onClick={handleClose} className={classes.close}>
              <i className='fas fa-times' />
            </div>
            <Dialog
              open={dialogOpen}
              onClose={() => this.handleClose('dialog')}
            >
              <div className={classes.dialog}>
                <DialogTitle>Delete Wallet</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this wallet address?
                  </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.action}>
                  <Button className={classes.btnDelete} onClick={this.removeAddress}>
                    Delete
                  </Button>
                  <Button className={classes.btnCancel} onClick={() => this.handleClose('dialog')}>
                    Cancel
                  </Button>
                </DialogActions>
                <div onClick={() => this.handleClose('dialog')} className={classes.close}>
                  <i className='fas fa-times' />
                </div>
              </div>
            </Dialog>
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  root: {
    height: '100%'
  },
  walletListWrapper: {
    position: 'relative',
    padding: '36px 6px 10px 36px',
    fontFamily: 'Noto Sans'
  },
  title: {
    color: '#333333',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.23px',
    lineHeight: '24px'
  },
  subTitle: {
    marginTop: '30px',
    color: '#333333',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '19px',
    paddingBottom: '10px',
    borderBottom: '1px solid #E9E9E9'
  },
  addressWrapper: {
    padding: '20px 0',
    borderBottom: '1px solid #E9E9E9'
  },
  address: {
    wordBreak: 'break-all',
    color: '#666666',
    fontFamily: 'Helvetica Neue',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '16px'
  },
  icons: {
    textAlign: 'right'
  },
  iconOpen: {
    color: '#9E9E9E',
    fontSize: '20px',
    marginRight: '20%'
  },
  iconRemove: {
    color: '#9E9E9E',
    fontSize: '20px',
    '&:hover': {
      'cursor': 'pointer'
    }
  },
  btnAdd: {
    marginTop: '30px',
    padding: '0',
    height: '40px',
    width: '119px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    color: '#FFFFFF',
    fontSize: '14px',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    textTransform: 'none'
  },
  close: {
    position: 'absolute',
    right: '30px',
    top: '28px',
    fontSize: '20px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  dialog: {
    padding: '10%',
    position: 'relative',
    borderRadius: '8px'
  },
  action: {
    justifyContent: 'flex-start',
    paddingLeft: '24px',
    marginLeft: '0'
  },
  btnDelete: {
    marginLeft: '0',
    marginRight: '20px',
    height: '40px',
    width: '83px',
    borderRadius: '4px',
    backgroundColor: '#F44337',
    color: '#FFFFFF',
    fontFamily: 'Helvetica Neue',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    padding: '0',
    textTransform: 'none'
  },
  btnCancel: {
    height: '40px',
    width: '87px',
    border: '1px solid #A8A8A8',
    borderRadius: '4px',
    color: '#666666',
    fontFamily: 'Helvetica Neue',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    padding: '0',
    textTransform: 'none'
  }
})

export default withStyles(theme)(WalletListComponent)
