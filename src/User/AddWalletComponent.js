import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'
import web3 from 'web3'
import { sha3_256 } from 'js-sha3'
import MessageUtils from './messageUtils'

class AddWalletComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      walletAddress: '',
      message: '',
      signedMessage: '',
      isVerifying: false,
      error: ''
    }
  }

  handleChange = (e, name) => {
    if (name === 'walletAddress') {
      this.setState({
        message: this.getMessage(e.target.value),
        [name]: e.target.value
      })
    } else {
      this.setState({
        [name]: e.target.value
      })
    }
  }

  getMessage = (val) => {
    if (!web3.utils.isAddress(val)) {
      return ''
    }
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < 30; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

    return sha3_256(text)
  }

  _verify = () => {
    try {
      const json = JSON.parse(this.state.signedMessage)
      if (json.address.toLowerCase() !== this.state.walletAddress.toLowerCase()) {
        return false
      }
      let hash = MessageUtils.hashPersonalMessage(
        MessageUtils.toBuffer(json.msg)
      )
      const sig = Buffer.from(MessageUtils.getNakedAddress(json.sig), 'hex')
      if (sig.length !== 65) {
        return false
      }
      sig[64] = sig[64] === 0 || sig[64] === 1 ? sig[64] + 27 : sig[64]
      if (json.version === '3') {
        if (json.signer === 'trezor') {
          hash = MessageUtils.getTrezorHash(json.msg)
        } else if (json.signer === 'ledger') {
          hash = MessageUtils.hashPersonalMessage(Buffer.from(json.msg))
        }
      } else if (json.version === '1') {
        hash = web3.utils.sha3(json.msg)
      }
      const pubKey = MessageUtils.ecrecover(
        hash,
        sig[64],
        sig.slice(0, 32),
        sig.slice(32, 64)
      )
      if (
        MessageUtils.getNakedAddress(json.address) !==
        MessageUtils.pubToAddress(pubKey).toString('hex')
      ) {
        return false
      } else {
        return true
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }

  verify = () => {
    this.setState({
      isVerifying: true
    })
    if (this._verify()) {
      this.props.addWallet(this.state.walletAddress)
      this.setState({
        error: ''
      }, () => this.props.handleClose())
    } else {
      this.setState({
        error: 'Invalid signed message. Please check again.'
      })
    }
    this.setState({
      isVerifying: false
    })
  }

  copy = () => {
    document.querySelector('#message').select()
    document.execCommand('copy')
  }

  render () {
    const { classes, handleClose } = this.props
    const { walletAddress, message, signedMessage, isVerifying, error } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container onClick={handleClose} direction='row' className={classes.addWalletWrapper} justify='center' alignItems='center'>
          <Grid item onClick={(e) => e.stopPropagation()} className={classes.addWallet} xs={10} sm={8} md={6}>
            <div className={classes.title}>
              Add Wallet
            </div>
            <div className={classes.intro}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </div>
            <div className={classes.stepTitle}>
              Step 1. Add Wallet Address
            </div>
            <TextField
              fullWidth
              InputProps={{ className: classes.input }}
              placeholder='Paste your wallet address here'
              value={walletAddress}
              onChange={(e) => this.handleChange(e, 'walletAddress')}
              margin='normal'
            />
            <div className={classes.stepTitle}>
              Step 2. Copy Message to MyEtherWallet
            </div>
            <TextField
              fullWidth
              id='message'
              InputProps={{ className: classNames(classes.input, classes.grayText) }}
              value={message}
              margin='normal'
            />
            <a onClick={this.copy} className={classNames(classes.btnLink, classes.firstBtnLink)}>Copy to Clipboard</a>
            <a href='https://www.myetherwallet.com/signmsg.html' target='_blank' className={classes.btnLink} rel='noopener noreferrer'>Open MyEtherWallet</a>
            <div className={classes.stepTitle}>
              Step 3. Paste Signed Message from MyEtherWallet
            </div>
            <TextField
              fullWidth
              multiline
              rowsMax='4'
              InputProps={{ className: classNames(classes.input, { [classes.error]: !!error }) }}
              placeholder='Paste the signed message here'
              value={signedMessage}
              onChange={(e) => this.handleChange(e, 'signedMessage')}
              margin='normal'
              helperText={error}
              error={!!error}
            />
            <Button onClick={this.verify} className={classes.btnVerify}>
              {isVerifying ? <CircularProgress className={classes.progress} classes={{ svg: classes.progressSvg }} /> : 'Verify'}
            </Button>
            <Button onClick={handleClose} className={classes.btnCancel}>
              Cancel
            </Button>
            <div onClick={handleClose} className={classes.close}>
              <i className='fas fa-times' />
            </div>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  addWalletWrapper: {
    height: '100%'
  },
  addWallet: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '60px 60px 30px 60px',
    fontFamily: 'Helvetica Neue'
  },
  title: {
    color: '#333333',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.23px',
    lineHeight: '23px'
  },
  intro: {
    marginTop: '13px',
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '16px'
  },
  stepTitle: {
    marginTop: '30px',
    marginBottom: '10px',
    color: '#333333',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.18px',
    lineHeight: '17px'
  },
  btnLink: {
    display: 'inline-block',
    textDecoration: 'none',
    marginTop: '10px',
    marginLeft: '6px',
    color: '#01A78D',
    fontSize: '12px',
    letterSpacing: '0.15px',
    lineHeight: '14px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  firstBtnLink: {
    marginRight: '30px'
  },
  input: {
    width: '100%',
    border: '1px solid #E9E9E9',
    padding: '10px 10px 8px 10px',
    borderRadius: '4px',
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
  error: {
    borderColor: '#F44336'
  },
  grayText: {
    backgroundColor: '#F8F8F8',
    color: '#A8A8A8'
  },
  btnVerify: {
    marginTop: '30px',
    textTransform: 'none',
    width: '77px',
    height: '40px',
    color: 'white',
    backgroundColor: '#049D82',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    '&:hover': {
      backgroundColor: '#049D82'
    }
  },
  btnCancel: {
    marginTop: '30px',
    border: '1px solid #9E9E9E',
    marginLeft: '20px',
    textTransform: 'none',
    width: '77px',
    height: '40px',
    color: '#666666',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px'
  },
  progress: {
    color: 'white',
    marginTop: '-7px'
  },
  progressSvg: {
    transform: 'scale(0.6)'
  },
  close: {
    position: 'absolute',
    right: '30px',
    top: '28px',
    fontSize: '20px',
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

export default withStyles(theme)(AddWalletComponent)
