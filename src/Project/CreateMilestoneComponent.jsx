import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AddCircle from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormHelperText from '@material-ui/core/FormHelperText'
import update from 'immutability-helper'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class CreateMilestoneComponent extends Component {
  constructor (props) {
    super(props)

    if (!props.milestone) {
      this.state = {
        anchorEl: null, // used as popover menu position anchor
        index: null, // refer to the obj index user clicked
        deleteOpen: false,
        discardOpen: false,
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        error: {},
        objList: [
          {
            title: '',
            description: ''
          }
        ]
      }
    } else {
      let ms = props.milestone
      let objList = []
      if (ms.objectives) {
        ms.objectives.map(obj => {
          objList.push({
            title: obj.content.title,
            description: obj.content.description
          })
        })
      }
      this.state = {
        anchorEl: null,
        index: null,
        deleteOpen: false,
        discardOpen: false,
        title: ms.content.title,
        description: ms.content.description,
        startDate: moment.unix(ms.content.expectedStartTime).toDate(),
        endDate: moment.unix(ms.content.expectedEndTime).toDate(),
        error: {},
        objList: objList
      }
    }
  }

  handleChange = (e, name, i, subname) => {
    if (name === 'objList') {
      this.setState({
        objList: update(this.state.objList, { [i]: { [subname]: { $set: e.target.value } } }),
        error: update(this.state.error, { [`objList-${i}-${subname}`]: { $set: null } })
      })
    } else if (name === 'startDate' || name === 'endDate') {
      this.setState({
        [name]: e,
        error: update(this.state.error, { [name]: { $set: null } })
      })
    } else {
      this.setState({
        [name]: e.target.value,
        error: update(this.state.error, { [name]: { $set: null } })
      })
    }
  }

  addObj = () => {
    this.setState({
      objList: update(this.state.objList, { $push: [{
        title: '',
        description: ''
      }] })
    })
  }

  deleteObj = () => {
    this.setState({
      deleteOpen: false,
      objList: update(this.state.objList, { $splice: [[this.state.index, 1]] })
    })
  }

  handleMenuOpen = (e, i) => {
    this.setState({
      anchorEl: e.currentTarget,
      index: i
    })
  }

  handleMenuClose = (name) => {
    if (name === 'Delete') {
      this.setState({
        deleteOpen: true
      })
    }
    this.setState({
      anchorEl: null
    })
  }

  handleDiscardOpen = () => {
    this.setState({
      discardOpen: true
    })
  }

  handleClose = (name) => {
    let nameMap = {
      delete: 'deleteOpen',
      discard: 'discardOpen'
    }
    this.setState({
      [nameMap[name]]: false
    })
  }

  validate = () => {
    const { title, startDate, endDate, objList } = this.state
    let error = {}
    if (!title) {
      error.title = 'Please enter title'
    }
    if (!startDate) {
      error.startDate = 'Please choose start date'
    }
    if (!endDate) {
      error.endDate = 'Please choose end date'
    }
    objList.map((obj, i) => {
      if (!obj.title) {
        error[`objList-${i}-title`] = 'Please enter title'
      }
    })
    if (Object.keys(error).length === 0) {
      return true
    } else {
      this.setState({
        error
      })
      return false
    }
  }

  createMilestone = () => {
    if (this.validate()) {
      // this.props.createMilestone()
    }
  }

  render () {
    const { classes, handleClose } = this.props
    const {
      anchorEl,
      index,
      deleteOpen,
      discardOpen,
      title,
      description,
      startDate,
      endDate,
      objList,
      error
    } = this.state
    const open = Boolean(anchorEl)

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction='row' className={classes.createMilestoneWrapper} justify='center'>
          <Grid item xs={10} lg={8} xl={6}>
            <Grid className={classes.titleWrapper} container direction='row' justify='space-between' spacing={8}>
              <Grid item xs={12} sm={8}>
                Create Milestone
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button onClick={this.handleDiscardOpen} className={classNames(classes.btnCancel, classes.fullWidth)}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button onClick={this.createMilestone} className={classNames(classes.btnCreate, classes.fullWidth)}>
                  Create
                </Button>
              </Grid>
            </Grid>
            <div className={classes.formWrapper}>
              <Grid container direction='row' spacing={16}>
                <Grid className={classes.title} item xs={12}>
                  Milestone
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={!!error.title}
                    helperText={error.title}
                    label='Title'
                    className={classes.textField}
                    value={title}
                    onChange={(e) => this.handleChange(e, 'title')}
                    margin='normal'
                    variant='outlined'
                  />
                </Grid>
                <Grid className={classes.text} item xs={12} md={6}>
                  Title should be concise and reflect the core goal of this period of work
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={!!error.description}
                    helperText={error.description}
                    label='Description'
                    className={classes.textField}
                    value={description}
                    multiline
                    rowsMax='4'
                    onChange={(e) => this.handleChange(e, 'description')}
                    margin='normal'
                    variant='outlined'
                  />
                </Grid>
                <Grid className={classes.text} item xs={12} md={6}>
                  Provide more details in description to help investors and
                  validators better understand your milestone
                </Grid>
                <Grid item xs={6} md={3}>
                  <div className={classes.dateWrapper}>
                    <DatePicker
                      placeholderText='Start Date'
                      className={classNames(classes.dateField, { [classes.dateFieldError]: error.startDate })}
                      selected={startDate}
                      showTimeSelect
                      dateFormat='Pp'
                      onChange={(date) => this.handleChange(date, 'startDate')}
                    />
                    {error.startDate && <FormHelperText error>{error.startDate}</FormHelperText>}
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div className={classes.dateWrapper}>
                    <DatePicker
                      placeholderText='End Date'
                      className={classNames(classes.dateField, { [classes.dateFieldError]: error.endDate })}
                      selected={endDate}
                      showTimeSelect
                      dateFormat='Pp'
                      onChange={(date) => this.handleChange(date, 'endDate')}
                    />
                    {error.endDate && <FormHelperText error>{error.endDate}</FormHelperText>}
                  </div>
                </Grid>
                <Grid className={classes.text} item xs={12} md={6}>
                  The start date and end date are estimated dates for reference. They will be auto-adjusted based on when the milestone is activated and ended.
                </Grid>
                {objList.map((obj, i) => {
                  return (
                    <Grid key={i} item xs={12}>
                      <Grid className={classes.objWrapper} container direction='row' spacing={16}>
                        <Grid item xs={12}>
                          <Grid container direction='row'>
                            <Grid className={classes.objTitle} item xs={12} md={6}>
                              Objective {i + 1}
                              <div className={classes.objMenu}>
                                <IconButton
                                  onClick={(e) => this.handleMenuOpen(e, i)}
                                >
                                  <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={open && index === i}
                                  onClose={this.handleMenuClose}
                                >
                                  <MenuItem className={classes.option} onClick={() => this.handleMenuClose('Delete')}>
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={!!error[`objList-${i}-title`]}
                            helperText={error[`objList-${i}-title`]}
                            label='Title'
                            className={classes.textField}
                            value={obj.title}
                            onChange={(e) => this.handleChange(e, 'objList', i, 'title')}
                            margin='normal'
                            variant='outlined'
                          />
                        </Grid>
                        <Grid className={classes.text} item xs={12} md={6}>
                          Objective should be single focused and specific
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={!!error[`objList-${i}-description`]}
                            helperText={error[`objList-${i}-description`]}
                            label='Description'
                            className={classes.textField}
                            value={obj.description}
                            multiline
                            rowsMax='4'
                            onChange={(e) => this.handleChange(e, 'objList', i, 'description')}
                            margin='normal'
                            variant='outlined'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                })}
                <Grid item xs={12}>
                  <div className={classes.btnAddObj} onClick={this.addObj}>
                    <AddCircle className={classes.iconAdd} />Add Objective
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={deleteOpen}
          onClose={() => this.handleClose('delete')}
        >
          <DialogTitle>{'Delete Objective'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <Button className={classes.btnCancel} onClick={() => this.handleClose('delete')}>
              Cancel
            </Button>
            <Button className={classes.btnDelete} onClick={this.deleteObj}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={discardOpen}
          onClose={() => this.handleClose('discard')}
        >
          <DialogTitle>{'Discard Changes'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <Button className={classes.btnCancel} onClick={() => this.handleClose('discard')}>
              Cancel
            </Button>
            <Button className={classes.btnDelete} onClick={handleClose}>
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  createMilestoneWrapper: {
    marginTop: '60px',
    fontFamily: 'Helvetica Neue'
  },
  titleWrapper: {
    color: '#333333',
    fontSize: '32px',
    fontWeight: '500',
    letterSpacing: '0.41px',
    lineHeight: '39px',
    marginBottom: '30px'
  },
  formWrapper: {
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.5)',
    marginTop: '26px',
    marginBottom: '26px',
    padding: '30px'
  },
  textField: {
    margin: '0',
    width: '100%',
    borderRadius: '4px',
    minHeight: '56px',
    marginBottom: '20px'
  },
  dateWrapper: {
    marginBottom: '20px'
  },
  dateField: {
    fontSize: '16px',
    padding: '14px',
    margin: '0',
    width: '100%',
    borderRadius: '4px',
    minHeight: '56px',
    border: '1px solid #C4C4C4',
    boxSizing: 'border-box'
  },
  dateFieldError: {
    color: '#F44336',
    borderColor: '#F44336',
    '&::placeholder': {
      color: '#F44336',
      opacity: '1'
    },
    '&:-ms-input-placeholder': {
      color: '#F44336'
    },
    '&::-ms-input-placeholder': {
      color: '#F44336'
    }
  },
  title: {
    color: '#333333',
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '0.29px',
    lineHeight: '23px',
    marginBottom: '20px'
  },
  objTitle: {
    color: '#333333',
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '0.29px',
    lineHeight: '23px',
    marginBottom: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '16px',
    marginTop: '5px'
  },
  option: {
    padding: '10px 40px'
  },
  fullWidth: {
    width: '100%'
  },
  btnCancel: {
    height: '40px',
    border: '1px solid #A8A8A8',
    borderRadius: '4px',
    color: '#666666',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    marginRight: '22px',
    textTransform: 'none'
  },
  btnCreate: {
    height: '40px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    textTransform: 'none'
  },
  dialogAction: {
    margin: '0',
    padding: '24px'
  },
  btnDelete: {
    height: '40px',
    borderRadius: '4px',
    backgroundColor: '#F44337',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    textTransform: 'none'
  },
  btnAddObj: {
    color: '#01A78D',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.18px',
    lineHeight: '17px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  iconAdd: {
    fontSize: '16px',
    marginRight: '8px'
  }
})

export default withStyles(theme)(CreateMilestoneComponent)
