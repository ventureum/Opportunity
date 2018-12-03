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
import Error from '../Error/ErrorComponent'
import TransactionProgress from '../Notification/TransactionProgress'

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
        expectedStartTime: null,
        expectedEndTime: null,
        validationError: {},
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
        ms.objectives.forEach(obj => {
          objList.push({
            objectiveId: obj.objectiveId,
            modified: false,
            deleted: false,
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
        modified: false,
        title: ms.content.title,
        description: ms.content.description,
        expectedStartTime: moment.unix(ms.content.expectedStartTime).toDate(),
        expectedEndTime: moment.unix(ms.content.expectedEndTime).toDate(),
        validationError: {},
        objList: objList
      }
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.actionsPending.addMilestone && !this.props.actionsPending.addMilestone) {
      this.props.handleClose()
    } else if (prevProps.actionsPending.modifyMilestone && !this.props.actionsPending.modifyMilestone) {
      this.props.handleClose()
    }
  }

  handleChange = (e, name, i, subname) => {
    if (name === 'objList') {
      if (this.state.objList[i].objectiveId) {
        this.setState({
          objList: update(this.state.objList, { [i]: { [subname]: { $set: e.target.value }, modified: { $set: true } } }),
          validationError: update(this.state.validationError, { [`objList-${i}-${subname}`]: { $set: null } })
        })
      } else {
        this.setState({
          objList: update(this.state.objList, { [i]: { [subname]: { $set: e.target.value } } }),
          validationError: update(this.state.validationError, { [`objList-${i}-${subname}`]: { $set: null } })
        })
      }
    } else if (name === 'expectedStartTime' || name === 'expectedEndTime') {
      this.setState({
        modified: true,
        [name]: e,
        validationError: update(this.state.validationError, { [name]: { $set: null } })
      })
    } else {
      this.setState({
        modified: true,
        [name]: e.target.value,
        validationError: update(this.state.validationError, { [name]: { $set: null } })
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
    if (this.state.objList[this.state.index].objectiveId) {
      this.setState({
        deleteOpen: false,
        objList: update(this.state.objList, { [this.state.index]: { deleted: { $set: true } } })
      })
    } else {
      this.setState({
        deleteOpen: false,
        objList: update(this.state.objList, { $splice: [[this.state.index, 1]] })
      })
    }
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
    const { title, expectedStartTime, expectedEndTime, objList } = this.state
    let validationError = {}
    if (!title) {
      validationError.title = 'Please enter title'
    }
    if (!expectedStartTime) {
      validationError.expectedStartTime = 'Please choose start date'
    }
    if (!expectedEndTime) {
      validationError.expectedEndTime = 'Please choose end date'
    }
    objList.forEach((obj, i) => {
      if (!obj.title) {
        validationError[`objList-${i}-title`] = 'Please enter title'
      }
    })
    if (Object.keys(validationError).length === 0) {
      return true
    } else {
      this.setState({
        validationError
      })
      return false
    }
  }

  createMilestone = () => {
    let {
      title,
      description,
      expectedStartTime,
      expectedEndTime,
      objList
    } = this.state
    expectedStartTime = moment(expectedStartTime).unix()
    expectedEndTime = moment(expectedEndTime).unix()
    let {
      milestone,
      addMilestone,
      modifyMilestone,
      handleClose,
      project
    } = this.props
    if (this.validate()) {
      let commands = []
      let ids = []
      let contents = []
      if (!milestone) {
        for (let i = 0; i < objList.length; i++) {
          commands.push(0)
          ids.push(i + 1)
          contents.push(JSON.stringify(objList[i]))
        }
        addMilestone(project.projectId, {
          title,
          description,
          expectedStartTime,
          expectedEndTime
        }, commands, ids, contents)
      } else {
        let lastObjId = 0
        for (let i = 0; i < objList.length; i++) {
          let obj = objList[i]
          if (obj.objectiveId) {
            lastObjId = obj.objectiveId
            if (obj.deleted) {
              commands.push(2)
              ids.push(obj.objectiveId)
              contents.push('')
            } else if (obj.modified) {
              commands.push(1)
              ids.push(obj.objectiveId)
              contents.push(JSON.stringify({
                title: obj.title,
                description: obj.description
              }))
            }
          } else {
            commands.push(0)
            ids.push(lastObjId + 1)
            lastObjId++
            contents.push(JSON.stringify(obj))
          }
        }
        console.log(commands, ids, contents)
        if (commands.length === 0 && !this.state.modified) {
          handleClose()
          return
        }
        modifyMilestone(project.projectId, milestone.milestoneId, {
          title,
          description,
          expectedStartTime,
          expectedEndTime
        }, commands, ids, contents)
      }
    }
  }

  render () {
    const { classes, handleClose, milestone, actionsPending, error } = this.props
    const {
      anchorEl,
      index,
      deleteOpen,
      discardOpen,
      title,
      description,
      expectedStartTime,
      expectedEndTime,
      objList,
      validationError
    } = this.state
    const open = Boolean(anchorEl)
    let objCount = 0

    if (error) {
      return (
        <div>
          <Error error={error} />
        </div>
      )
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction='row' className={classes.createMilestoneWrapper} justify='center'>
          <Grid item xs={10} lg={8} xl={6}>
            <Grid className={classes.titleWrapper} container direction='row' justify='space-between' spacing={8}>
              <Grid item xs={12} sm={8}>
                {milestone ? 'Update Milestone' : 'Create Milestone'}
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button onClick={this.handleDiscardOpen} className={classNames(classes.btnCancel, classes.fullWidth)}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button onClick={this.createMilestone} className={classNames(classes.btnCreate, classes.fullWidth)}>
                  {milestone ? 'Update' : 'Create'}
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
                    error={!!validationError.title}
                    helperText={validationError.title}
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
                    error={!!validationError.description}
                    helperText={validationError.description}
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
                      className={classNames(classes.dateField, { [classes.dateFieldvalidationError]: validationError.expectedStartTime })}
                      selected={expectedStartTime}
                      showTimeSelect
                      dateFormat='Pp'
                      onChange={(date) => this.handleChange(date, 'expectedStartTime')}
                    />
                    {validationError.expectedStartTime && <FormHelperText error>{validationError.expectedStartTime}</FormHelperText>}
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div className={classes.dateWrapper}>
                    <DatePicker
                      placeholderText='End Date'
                      className={classNames(classes.dateField, { [classes.dateFieldvalidationError]: validationError.expectedEndTime })}
                      selected={expectedEndTime}
                      showTimeSelect
                      dateFormat='Pp'
                      onChange={(date) => this.handleChange(date, 'expectedEndTime')}
                    />
                    {validationError.expectedEndTime && <FormHelperText error>{validationError.expectedEndTime}</FormHelperText>}
                  </div>
                </Grid>
                <Grid className={classes.text} item xs={12} md={6}>
                  The start date and end date are estimated dates for reference. They will be auto-adjusted based on when the milestone is activated and ended.
                </Grid>
                {objList.map((obj, i) => {
                  if (!obj.deleted) {
                    objCount++
                    return (
                      <Grid key={objCount} item xs={12}>
                        <Grid className={classes.objWrapper} container direction='row' spacing={16}>
                          <Grid item xs={12}>
                            <Grid container direction='row'>
                              <Grid className={classes.objTitle} item xs={12} md={6}>
                                Objective {objCount}
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
                              error={!!validationError[`objList-${i}-title`]}
                              helperText={validationError[`objList-${i}-title`]}
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
                              error={!!validationError[`objList-${i}-description`]}
                              helperText={validationError[`objList-${i}-description`]}
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
                  }
                  return null
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
        {(actionsPending.modifyMilestone || actionsPending.addMilestone) &&
          <TransactionProgress open />
        }
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
  dateFieldvalidationError: {
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
