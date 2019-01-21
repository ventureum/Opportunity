import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Typography from '@material-ui/core/Typography'
import update from 'immutability-helper'

class MilestoneObjVoteComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      objRating: {},
      comment: '',
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

  handleRatingChange = (e, objId) => {
    let newState = update(this.state, { objRating: { [objId]: { $set: e.target.value } } })
    this.setState(newState)
  }

  handleCommentChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit = () => {
    let { milestone, rateObj } = this.props

    // submit rating and comment
    let { objRating, comment } = this.state
    let commentContent = {
      title: '',
      text: comment
    }
    rateObj(milestone.projectId, milestone.milestoneId, objRating, JSON.stringify(commentContent))
    this.props.onClose()
  }

  renderObj = (obj) => {
    const { classes } = this.props
    const { objRating } = this.state
    return (
      <Grid item xs={12} className={classes.obj} key={obj.objectiveId}>
        <Grid container direction='row'>
          <Grid item xs={9} >
            <div>
              <div className={classes.objTitle}>
                {obj.content.title}
              </div>
              <div className={classes.objDesc}>
                {obj.content.description}
              </div>
            </div>
          </Grid>
          <Grid item xs={3} >
            <div className={classes.rateSelectContainer} >
              <FormControl className={classes.rateForm}>
                <InputLabel htmlFor='rating-auto-width'>Rate</InputLabel>
                <Select
                  value={objRating[[obj.objectiveId]] || 0}
                  onChange={(e) => this.handleRatingChange(e, obj.objectiveId)}
                  input={<Input name='rating' id='rating-auto-width' />}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={2}>1</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render () {
    const { classes, milestone, onClose, fullScreen, open } = this.props

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={onClose}
        fullScreen={fullScreen}
        maxWidth='md'
        aria-labelledby='obj-vote-dialog-title'
        open={open}
      >
        <DialogTitle id='obj-vote-dialog-title'> {milestone.content.title} Rating </DialogTitle>
        <DialogContent>
          <Grid container direction='column' className={classes.modalWrapper}>
            <Grid item>
              <Typography className={classes.intro}>
                { milestone.content.description }
              </Typography>
              <Divider />
            </Grid>
            { milestone.objectives.map((o) => this.renderObj(o))}
            <Grid item>
              <TextField
                multiline
                margin='normal'
                id='obj-vote-comment'
                label='Add your comment here (optional)'
                variant='outlined'
                fullWidth
                onChange={this.handleCommentChange('comment')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={classes.objVoteBtnCancel} onClick={onClose} >
              Cancel
          </Button>
          <Button className={classes.objVoteBtnSubmit} onClick={this.onSubmit} >
              Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const style = theme => ({
  modalWrapper: {
    height: '100%',
    width: '100%',
    padding: '0px 30px 30px 30px'
  },
  intro: {
    marginTop: '13px',
    marginBottom: '37px',
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '16px'
  },
  obj: {
    marginBottom: '20px',
    padding: '20px 0',
    borderTop: '1px solid #E9E9E9'
  },
  objTitle: {
    color: '#666666',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.15px',
    lineHeight: '17px'
  },
  objDesc: {
    color: '#666666',
    fontSize: '12px',
    letterSpacing: '0.15px',
    lineHeight: '17px'
  },
  rateForm: {
    minWidth: '50%',
    marginLeft: '30%'
  },
  objVoteBtnSubmit: {
    marginTop: '30px',
    textTransform: 'none',
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
  objVoteBtnCancel: {
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
  }
})

export default withMobileDialog()(withStyles(style)(MilestoneObjVoteComponent))
