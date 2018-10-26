import React, { Component } from 'react'
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WalletList from './WalletListComponent'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'

class MyProjectsComponent extends Component {
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
        <Grid container direction='column'>
          <Grid item>
            <Button onClick={this.handleOpen}>Manage Wallets</Button>
            <Modal
              disableRestoreFocus
              disableEnforceFocus
              disableAutoFocus
              BackdropProps={{ classes: { root: classes.backdrop } }}
              open={open}
              onClose={this.handleClose}
            >
              <Grid onClick={this.handleClose} container direction='row' justify='flex-end'>
                <Grid className={classes.walletListModal} item xs={12} sm={8} md={6}>
                  <WalletList handleClose={this.handleClose} />
                </Grid>
              </Grid>
            </Modal>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
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
