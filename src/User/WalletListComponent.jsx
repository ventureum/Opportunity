import React, { Component } from 'react'
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddWallet from './AddWalletComponent'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'

class WalletListComponent extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { classes } = this.props
    const { open } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction='column' className={classes.walletListWrapper} onClick={(e) => e.stopPropagation()}>
          <Grid item>
            <Button onClick={this.handleOpen}>Add Wallet</Button>
            <Modal
              disableRestoreFocus
              disableEnforceFocus
              disableAutoFocus
              open={open}
              onClose={this.handleClose}
            >
              <AddWallet handleClose={this.handleClose} />
            </Modal>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  walletListWrapper: {
    height: '100%'
  }
})

export default withStyles(theme)(WalletListComponent)
