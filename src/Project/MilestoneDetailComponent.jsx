import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import MilestoneObjVote from './MilestoneObjVoteComponent'
import TransactionProgress from '../Notification/TransactionProgress'
import Error from '../Error/ErrorComponent'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

var moment = require('moment')
var numeral = require('numeral')

class MilestoneDetailComponent extends Component {
  constructor () {
    super()

    this.state = {
      objVoteModalOpen: false,
      evaluatorList: [
        {
          avatar: '/mock_logo.png'
        }, {
          avatar: '/mock_logo.png'
        }, {
          avatar: '/mock_logo.png'
        }, {
          avatar: '/mock_logo.png'
        }, {
          avatar: '/mock_logo.png'
        }
      ],
      fileList: [
      ],
      relatedPosts: []
    }
  }

  getDateStr = (startTime, endTime) => {
    let start = null
    let end = null
    if (startTime > 0) {
      start = moment.unix(startTime).format('MMM Do YYYY')
    }
    if (endTime > 0) {
      end = moment.unix(endTime).format('MMM Do YYYY')
    }

    let rv = ' - '
    if (start) {
      rv = start + rv
    } else {
      // not activated yet
      return 'todo'
    }
    if (end) {
      rv = rv + end
    } else {
      rv = rv + 'present'
    }
    return rv
  }

  handleObjVoteModalOpen = () => {
    this.setState({ objVoteModalOpen: true })
  }

  handleObjVoteModalClose = () => {
    this.setState({ objVoteModalOpen: false })
  }

  render () {
    const { classes, milestone, profile, handleClose, rateObj, actionsPending, error, relatedPostsForMilestone } = this.props
    const { fileList } = this.state
    const top5Validator = relatedPostsForMilestone.slice(0, 5)
    if (error) {
      return (<Error error={error} />)
    }

    return (
      <Grid container direction='column' className={classes.milestone} onClick={(e) => e.stopPropagation()}>
        <Grid item className={classes.title}>
          {milestone.content.title}
        </Grid>
        <Grid item className={classes.desc}>
          {milestone.content.description}
        </Grid>
        <Grid item className={classes.date}>
          {this.getDateStr(milestone.startTime, milestone.endTime)}
        </Grid>
        <Grid item className={classes.rating}>
          <div className={classes.ratingScore}>
            {numeral(milestone.avgRating / 10.0).format('0.0')}
          </div>
          <div className={classes.evaluator}>
            {top5Validator.map((person, i) => {
              return (
                <img key={i} className={classes.avatar} src={person.photoUrl} alt='' />
              )
            })}
            <div className={classes.evaluatorNote}>
              Voted by {top5Validator.length} evaluators
            </div>
          </div>
        </Grid>
        <Grid item>
          <Grid container direction='column' className={classes.objWrapper}>
            {milestone.objectives && milestone.objectives.map((obj, i) => {
              return (
                <Grid item xs={12} className={classes.obj} key={i}>
                  <div className={classes.objId}>
                    Objective&nbsp;{(i + 1)}
                    <div className={classes.objRating}>
                      {numeral(obj.avgRating / 10.0).format('0.0')}
                    </div>
                  </div>
                  <div>
                    <div className={classes.objTitle}>
                      {obj.content.title}
                    </div>
                    <div className={classes.objDesc}>
                      {obj.content.description}
                    </div>
                  </div>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item>
          {profile.actorType === 'KOL' &&
            <Button variant='outlined' className={classes.objVoteBtn} onClick={this.handleObjVoteModalOpen} >
              Rate
            </Button>
          }
        </Grid>
        <Grid item>
          <Grid container direction='column'>
            <Grid item xs={12} className={classes.sectionTitle}>
              Attached Files
            </Grid>
            {fileList.map((file, i) => {
              return (
                <Grid item xs={12} key={i} className={classes.file}>
                  <i className={classNames('fas', 'fa-file', classes.fileIcon)} />
                  <a className={classes.fileName} href={file.link} target='_blank' rel='noopener noreferrer' >{file.name}</a>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction='column'>
            <Grid item xs={12} className={classes.sectionTitle}>
              Related Posts
            </Grid>
            {actionsPending.getRelatedPostsForMilestone
              ? <Grid item >
                <Grid container direction='row' justify='center'>
                  <CircularProgress />
                </Grid>
              </Grid>
              : relatedPostsForMilestone.map((post, i) => {
                return (
                  <Grid item xs={12} key={i} className={classes.post}>
                    <Grid container direction='row' >
                      <Grid item xs='auto'>
                        <img src={post.photoUrl} alt='' className={classes.postAvatar} />
                      </Grid>
                      <Grid item className={classes.postContent} xs={8} md={10} xl={11}>
                        <Typography className={classes.postTitle}>{post.content.text}</Typography>
                        <Typography className={classes.postAuthor}>{post.content.title}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })}
          </Grid>
        </Grid>
        <div onClick={handleClose} className={classes.close}>
          <i className='fas fa-times' />
        </div>
        {milestone.objectives &&
          <MilestoneObjVote
            open={this.state.objVoteModalOpen}
            onClose={this.handleObjVoteModalClose}
            milestone={milestone}
            rateObj={rateObj}
          />
        }
        {actionsPending.rateObj && <TransactionProgress open />}
      </Grid>
    )
  }
}

const style = theme => ({
  milestone: {
    padding: '60px',
    position: 'relative'
  },
  title: {
    color: '#333333',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.23px',
    lineHeight: '24px',
    marginBottom: '10px'
  },
  desc: {
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '19px',
    marginBottom: '20px'
  },
  date: {
    color: '#666666',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '19px',
    marginBottom: '30px'
  },
  rating: {
    display: 'flex',
    marginBottom: '30px'
  },
  ratingScore: {
    color: 'white',
    height: '36px',
    width: '36px',
    borderRadius: '4px',
    backgroundColor: '#01A78D',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.18px',
    lineHeight: '36px',
    textAlign: 'center',
    marginRight: '20px'
  },
  evaluator: {
    flex: '1'
  },
  avatar: {
    height: '32px',
    width: '32px',
    borderRadius: '16px',
    marginTop: '2px',
    marginRight: '10px',
    marginBottom: '8px'
  },
  evaluatorNote: {
    padding: '0',
    color: '#666666',
    fontSize: '12px',
    letterSpacing: '0.15px',
    lineHeight: '17px'
  },
  obj: {
    display: 'flex',
    marginBottom: '20px',
    padding: '20px 0',
    borderTop: '1px solid #E9E9E9'
  },
  objWrapper: {
    marginBottom: '20px',
    borderBottom: '1px solid #E9E9E9'
  },
  objId: {
    color: '#666666',
    fontSize: '12px',
    letterSpacing: '0.15px',
    lineHeight: '17px',
    textAlign: 'center',
    marginRight: '37px'
  },
  objRating: {
    marginTop: '20px',
    color: '#333333',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.23px',
    lineHeight: '24px'
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
  sectionTitle: {
    marginTop: '40px',
    marginBottom: '20px',
    color: '#333333',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.18px',
    lineHeight: '19px'
  },
  file: {
    display: 'flex',
    marginBottom: '20px'
  },
  fileIcon: {
    fontSize: '20px',
    color: '#9E9E9E',
    lineHeight: '19px',
    paddingTop: '3px',
    marginRight: '10px'
  },
  fileName: {
    textDecoration: 'none',
    color: '#333333',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '25px'
  },
  post: {
    display: 'flex',
    marginBottom: '20px'
  },
  postAvatar: {
    marginTop: '3px',
    height: '32px',
    width: '32px',
    borderRadius: '16px'
  },
  postContent: {
    marginLeft: '20px'
  },
  postTitle: {
    textDecoration: 'none',
    color: '#333333',
    fontSize: '14px',
    letterSpacing: '0.18px',
    lineHeight: '19px',
    marginBottom: '4px'
  },
  postAuthor: {
    color: '#666666',
    fontSize: '12px',
    letterSpacing: '0.15px',
    lineHeight: '17px'
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
  objVoteBtn: {
    color: '#01A78D',
    border: '1px solid #01A78D'
  }
})

export default withStyles(style)(MilestoneDetailComponent)
