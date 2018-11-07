import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

class TransactionProgressComponent extends Component {
  render () {
    const { classes, ...other } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth='sm'
          aria-labelledby='transaction-progress-dialog'
          {...other}
        >
          <DialogContent>
            <Grid container direction='column' className={classes.modalWrapper}>
              <Grid item>
                <Typography className={classes.message} variant='subtitle2'>
                  Waiting for transaction to be mined
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <LinearProgress />
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  modalWrapper: {
    padding: '30px 30px 30px 30px'
  }
})

export default withStyles(theme)(TransactionProgressComponent)
