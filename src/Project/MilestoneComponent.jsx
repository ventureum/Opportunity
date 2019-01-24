import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import update from 'immutability-helper'

class MilestoneComponent extends Component {
  state = {
    open: false,
    rating: {}
  }

  handleRatingChange = (event) => {
    this.setState(update(this.state, { rating: { [event.target.name]: { $set: event.target.value } } }))
  }

  renderObj = (obj) => {
    let { classes } = this.props
    return (
      <Grid item key={obj.objId}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container direction='row' alignItems='center'>
              <Grid item lg={11}>
                <Typography className={classes.heading}>
                  {obj.content.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.milestoneObjRating} >
                  4.8
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            {obj.content.description}
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <form autoComplete='off'>
              <FormControl>
                <InputLabel htmlFor='rating-simple'>Rating</InputLabel>
                <Select
                  value={this.state.rating[obj.objId] || ''}
                  onChange={this.handleRatingChange}
                  input={<Input name='rating' id='rating-simple' />}
                  inputProps={{
                    name: String(obj.objId),
                    id: 'rating-simple'
                  }}
                >
                  <MenuItem value={10}> 1.0 </MenuItem>
                  <MenuItem value={20}> 2.0 </MenuItem>
                  <MenuItem value={30}> 3.0 </MenuItem>
                  <MenuItem value={40}> 4.0 </MenuItem>
                  <MenuItem value={50}> 5.0 </MenuItem>
                </Select>
                <FormHelperText> Choose a rating for the objective </FormHelperText>
              </FormControl>
            </form>
            <Button className={classes.ratingSubmitBtn} variant='contained'>
              Submit Rating
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </Grid>
    )
  }

  render () {
    let objs = []
    for (let i = 0; i < 5; i++) {
      objs.push({
        objId: i,
        content: {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.'
        },
        totalRating: 4320,
        totalWeight: 1200
      })
    }
    return (
      <Dialog
        open
        onClose={this.handleClose}
        scroll='body'
        aria-labelledby='scroll-dialog-title'
      >
        <DialogContent>
          <Grid container direction='column' justify='center' alignItems='center' spacing={8}>
            <Grid item key='milestone-description'>
              <Grid container direction='column' justify='center' alignItems='flex-start' spacing={8}>
                <Grid item>
                  <Typography variant='headline'>
                    Milestone #1
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio
                  </Typography>
                  <Divider styles={{ width: '100%' }} />
                </Grid>
                <Grid item>
                  <Typography variant='headline'>
                    Objectives
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {objs.map((o) => this.renderObj(o))}
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

const style = theme => ({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  root: {
    height: '50vh',
    width: '50vw'
  },
  heading: {
    fontSize: 15
  },
  secondaryHeading: {
    fontSize: 15,
    color: 'blue'
  },
  milestoneObjRating: {
    width: '35px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    textAlign: 'center',
    padding: '5px 0',
    fontSize: '16px',
    color: '#FFFFFF'
  },
  ratingSubmitBtn: {
    backgroundColor: '#2196f3',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
})

export default withStyles(style)(MilestoneComponent)
