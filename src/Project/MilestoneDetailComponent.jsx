import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import MilestoneObjVote from './MilestoneObjVoteComponent'

var moment = require('moment')

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
        {
          name: 'Compatible Inkjet Cartridge',
          link: 'https://www.google.com'
        }, {
          name: 'Compatible Inkjet Cartridge',
          link: 'https://www.google.com'
        }
      ],
      relatedPosts: [
        {
          avatar: '/mock_logo.png',
          title: 'Types Of Paper In Catalog',
          author: 'Russell West',
          link: 'https://www.google.com'
        }, {
          avatar: '/mock_logo.png',
          title: 'Types Of Paper In Catalog',
          author: 'Russell West',
          link: 'https://www.google.com'
        }, {
          avatar: '/mock_logo.png',
          title: 'Types Of Paper In Catalog',
          author: 'Russell West',
          link: 'https://www.google.com'
        }, {
          avatar: '/mock_logo.png',
          title: 'Types Of Paper In Catalog',
          author: 'Russell West',
          link: 'https://www.google.com'
        }, {
          avatar: '/mock_logo.png',
          title: 'Types Of Paper In Catalog',
          author: 'Russell West',
          link: 'https://www.google.com'
        }
      ]
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
    const { classes, milestone, profile, handleClose, rateObj } = this.props
    const { evaluatorList, fileList, relatedPosts } = this.state

    return (
      <MuiThemeProvider theme={theme}>
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
            <div className={classes.ratingScore}>{milestone.avgRating}</div>
            <div className={classes.evaluator}>
              {evaluatorList.map((person, i) => {
                return (
                  <img key={i} className={classes.avatar} src={person.avatar} alt='' />
                )
              })}
              <div className={classes.evaluatorNote}>
                Voted by {evaluatorList.length} evaluators
              </div>
            </div>
          </Grid>
          <Grid item>
            <Grid container direction='column' className={classes.objWrapper}>
              {milestone.objectives.map((obj, i) => {
                return (
                  <Grid item xs={12} className={classes.obj} key={i}>
                    <div className={classes.objId}>
                       Objective&nbsp;{(i + 1)}
                      <div className={classes.objRating}>
                        {obj.avgRating}
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
            { profile.actorType === 'KOL' &&
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
                    <a className={classes.fileName} href={file.link} target='_blank'>{file.name}</a>
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
              {relatedPosts.map((post, i) => {
                return (
                  <Grid item xs={12} key={i} className={classes.post}>
                    <img src={post.avatar} alt='' className={classes.postAvatar} />
                    <div className={classes.postContent}>
                      <a href={post.link} target='_blank' className={classes.postTitle}>{post.title}</a>
                      <div className={classes.postAuthor}>{post.author}</div>
                    </div>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <div onClick={handleClose} className={classes.close}>
            <i className='fas fa-times' />
          </div>
          <MilestoneObjVote
            open={this.state.objVoteModalOpen}
            onClose={this.handleObjVoteModalClose}
            milestone={milestone}
            rateObj={rateObj}
          />
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  milestone: {
    padding: '60px',
    position: 'relative',
    fontFamily: 'Noto Sans'
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
    fontFamily: 'Noto Sans',
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

export default withStyles(theme)(MilestoneDetailComponent)
