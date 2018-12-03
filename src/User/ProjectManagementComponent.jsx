import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Modal from '@material-ui/core/Modal'
import Loading from '../Notification/Loading'
import TransactionProgress from '../Notification/TransactionProgress'
import Error from '../Error/ErrorComponent'
import NavBar from '../User/NavBarContainer'
import MilestoneDetail from '../Project/MilestoneDetailContainer'
import CreateMilestone from '../Project/CreateMilestoneComponent'
var moment = require('moment')

class ProjectManagementComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      anchorEl: null,
      index: null,
      milestoneDetailOpen: false,
      activateOpen: false,
      finalizeOpen: false,
      deleteOpen: false,
      createOpen: false
    }
  }

  handleMenuOpen = (e, i) => {
    this.setState({
      anchorEl: e.currentTarget,
      index: i
    })
  }

  handleMenuClose = (name) => {
    if (name === 'View Detail') {
      this.setState({
        milestoneDetailOpen: true
      })
    } else if (name === 'Activate') {
      this.setState({
        activateOpen: true
      })
    } else if (name === 'Finalize') {
      this.setState({
        finalizeOpen: true
      })
    } else if (name === 'Delete') {
      this.setState({
        deleteOpen: true
      })
    } else if (name === 'Edit') {
      this.setState({
        createOpen: true
      })
    }
    this.setState({
      anchorEl: null
    })
  }

  handleCreateOpen = () => {
    this.setState({
      index: null,
      createOpen: true
    })
  }

  handleClose = (name) => {
    let nameMap = {
      detail: 'milestoneDetailOpen',
      activate: 'activateOpen',
      finalize: 'finalizeOpen',
      delete: 'deleteOpen',
      create: 'createOpen'
    }
    this.setState({
      [nameMap[name]]: false
    })
    if (name === 'detail') {
      this.setState({
        index: null
      })
    }
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    })
  }

  getOptions = (ms) => {
    if (ms.state === 'PENDING') {
      return ['View Detail', 'Edit', 'Activate', 'Delete']
    } else if (ms.state === 'IN_PROGRESS') {
      return ['View Detail', 'Finalize']
    } else if (ms.state === 'COMPLETE') {
      return ['View Detail']
    }
  }

  getMilestoneStatus = (str) => {
    let statusMap = {
      'COMPLETE': 'Complete',
      'IN_PROGRESS': 'In Progress',
      'PENDING': 'Pending'
    }
    return statusMap[str]
  }

  render () {
    const {
      classes,
      project,
      actionsPending,
      error,
      addMilestone,
      modifyMilestone,
      activateMilestone,
      finalizeMilestone,
      removeMilestone
    } = this.props
    const { anchorEl, index, milestoneDetailOpen, activateOpen, finalizeOpen, deleteOpen, createOpen } = this.state
    const open = Boolean(anchorEl)

    if (error) {
      return (
        <div>
          <Error error={error} />
        </div>
      )
    }

    if (actionsPending.getProjectByAdmin) {
      return (
        <div>
          <Loading />
        </div>
      )
    }

    if (!project) {
      return (
        <div>
          <NavBar />
        </div>
      )
    }

    if (createOpen) {
      return (
        <div>
          <NavBar />
          <CreateMilestone
            actionsPending={actionsPending}
            error={error}
            handleClose={() => this.handleClose('create')}
            addMilestone={addMilestone}
            modifyMilestone={modifyMilestone}
            project={project}
            milestone={index !== null && project.milestonesInfo.milestones[index]}
          />
        </div>
      )
    }

    return (
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <Grid className={classes.projectManagement} container direction='row' justify='center' alignItems='center'>
          <Grid item xs={10} lg={8} xl={6}>
            <Grid className={classes.titleWrapper} container direction='row' justify='space-between' spacing={8}>
              <Grid item xs={12} sm={9} xl={10}>
                Project Management
              </Grid>
              <Grid item xs={12} sm={3} xl={2}>
                <Button onClick={this.handleCreateOpen} className={classes.btnCreate}>
                  Create Milestone
                </Button>
              </Grid>
            </Grid>
            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>Milestone Name</TableCell>
                    <TableCell className={classes.tableHead}>Start Date</TableCell>
                    <TableCell className={classes.tableHead}>End Date</TableCell>
                    <TableCell className={classes.tableHead}>Status</TableCell>
                    <TableCell className={classes.tableHead}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.milestonesInfo.milestones && project.milestonesInfo.milestones.map((ms, i) => {
                    return (
                      <TableRow key={ms.milestoneId}>
                        <TableCell className={classes.tableText}>{ms.content.title}</TableCell>
                        <TableCell className={classes.tableText}>{ms.startTime ? moment.unix(ms.startTime).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                        <TableCell className={classes.tableText}>{ms.endTime ? moment.unix(ms.endTime).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                        <TableCell className={classes.tableText}>{this.getMilestoneStatus(ms.state)}</TableCell>
                        <TableCell className={classes.tableText}>
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
                            {this.getOptions(ms).map(option => {
                              if (option === 'Delete') {
                                return [
                                  <hr className={classes.separateLine} />,
                                  <MenuItem className={classes.option} key={option} onClick={() => this.handleMenuClose(option)}>
                                    {option}
                                  </MenuItem>
                                ]
                              } else {
                                return (
                                  <MenuItem className={classes.option} key={option} onClick={() => this.handleMenuClose(option)}>
                                    {option}
                                  </MenuItem>
                                )
                              }
                            })}
                          </Menu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Grid>
        {index !== null &&
          <Modal
            disableRestoreFocus
            disableEnforceFocus
            disableAutoFocus
            BackdropProps={{ classes: { root: classes.backdrop } }}
            open={milestoneDetailOpen}
            onClose={() => this.handleClose('detail')}
          >
            <Grid onClick={() => this.handleClose('detail')} container direction='row' justify='flex-end'>
              <Grid className={classes.milestoneModal} item xs={12} sm={8} md={6}>
                <MilestoneDetail
                  handleClose={() => this.handleClose('detail')}
                  milestone={project.milestonesInfo.milestones[index]}
                />
              </Grid>
            </Grid>
          </Modal>
        }
        <Dialog
          open={activateOpen}
          onClose={() => this.handleClose('activate')}
        >
          <DialogTitle>{'Activate Milestone'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <Button className={classes.btnCancel} onClick={() => this.handleClose('activate')}>
              Cancel
            </Button>
            <Button className={classes.btnActive} onClick={() => { this.handleClose('activate'); activateMilestone(project.projectId, project.milestonesInfo.milestones[index].milestoneId) }}>
              Active
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={finalizeOpen}
          onClose={() => this.handleClose('finalize')}
        >
          <DialogTitle>{'Finalize Milestone'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <Button className={classes.btnCancel} onClick={() => this.handleClose('finalize')}>
              Cancel
            </Button>
            <Button className={classes.btnDelete} onClick={() => { this.handleClose('finalize'); finalizeMilestone(project.projectId, project.milestonesInfo.milestones[index].milestoneId) }}>
              Finalize
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={deleteOpen}
          onClose={() => this.handleClose('delete')}
        >
          <DialogTitle>{'Delete Milestone'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <Button className={classes.btnCancel} onClick={() => this.handleClose('delete')}>
              Cancel
            </Button>
            <Button className={classes.btnDelete} onClick={() => { this.handleClose('delete'); removeMilestone(project.projectId, project.milestonesInfo.milestones[index].milestoneId) }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {(actionsPending.activateMilestone || actionsPending.finalizeMilestone || actionsPending.removeMilestone) &&
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
  projectManagement: {
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
  btnCreate: {
    width: '100%',
    height: '40px',
    float: 'right',
    marginTop: '6px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.23px',
    lineHeight: '20px',
    textTransform: 'none'
  },
  tableWrapper: {
    overflow: 'auto',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '4px',
    boxShadow: '0 4px 8px 0 rgba(168,168,168,0.5)'
  },
  tableHead: {
    color: '#666666',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.2px',
    lineHeight: '15px'
  },
  tableText: {
    color: '#333333',
    fontSize: '14px',
    letterSpacing: '0.23px',
    lineHeight: '16px'
  },
  backdrop: {
    background: 'inherit'
  },
  milestoneModal: {
    background: 'white',
    height: '100vh',
    overflow: 'auto',
    outline: 'none!important',
    borderLeft: '1px solid #E9E9E9',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)'
  },
  option: {
    padding: '10px 40px'
  },
  separateLine: {
    backgroundColor: '#E9E9E9',
    height: '1px',
    border: 'none'
  },
  dialogAction: {
    margin: '0',
    padding: '24px'
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
  btnActive: {
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
  }
})

export default withStyles(theme)(ProjectManagementComponent)
