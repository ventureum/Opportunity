import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function FooterComponent ({ ...props }) {
  const { classes } = props
  return (
    <footer className={classes.root}>
      <Grid container direction='column'>
        <Grid item xl={6} ld={6} md={6} sm={12} xs={12}>
          <Grid container>
            <Grid item xl={4} md={4} sm={4} xs={4}>
              <List>
                <ListItem className={classes.listItem}>
                  <Typography variant='subheading' align='left' className={classes.listTitle}>
                    Features
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/' className={classes.link}>
                    <Typography align='left' className={classes.listContent}>
                      Projects
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/validators' className={classes.link}>
                    <Typography align='left' className={classes.listContent}>
                      validators
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/my-projects' className={classes.link}>
                    <Typography align='left' className={classes.listContent}>
                      Votings
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={4} md={4} sm={4} xs={4}>
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Typography variant='subheading' className={classes.listTitle}>
                    NETWORK
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a className={classes.link} target='_blank' rel='noopener noreferrer' href='https://t.me/ventureum'>
                    <Typography className={classes.listContent}>
                      Telegram
                    </Typography>
                  </a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a className={classes.link} target='_blank' rel='noopener noreferrer' href='https://medium.com/@ventureum'>
                    <Typography className={classes.listContent}>
                      Medium
                    </Typography>
                  </a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a className={classes.link} target='_blank' rel='noopener noreferrer' href='https://github.com/ventureum'>
                    <Typography className={classes.listContent}>
                      Github
                    </Typography>
                  </a>
                </ListItem>
              </List>
            </Grid>
            <Grid item xl={4} md={4} sm={4} xs={4}>
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Typography variant='subheading' className={classes.listTitle}>
                    RESOURCES
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/faq' className={classes.link}>
                    <Typography className={classes.listContent}>
                      FAQ
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/contact' className={classes.link}>
                    <Typography className={classes.listContent}>
                      Contact Us
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/privacy' className={classes.link}>
                    <Typography className={classes.listContent}>
                      Privacy Policy
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Link to='/terms' className={classes.link}>
                    <Typography className={classes.listContent}>
                      Terms
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} ld={12} md={12} sm={12} xs={12}>
          <Typography className={classes.copyright}>
    &copy; {'2017 - '}{1900 + new Date().getYear()} Ventureum Inc. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}

const style = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
      paddingLeft: '140px',
      paddingRight: '140px'
    },
    paddingTop: '60px',
    backgroundColor: '#333333'
  },
  link: {
    textDecoration: 'none'
  },
  listItem: {
    justifyContent: 'left'
  },
  listTitle: {
    color: '#A8A8A8',
    fontWeight: '500'
  },
  listContent: {
    color: '#FFFFFF',
    fontWeight: '500'
  },
  copyright: {
    color: '#FFFFFF',
    fontWeight: '500',
    paddingTop: '5px',
    paddingBottom: '30px',
    [theme.breakpoints.up('md')]: {
      textAlign: 'right'
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  }
})

export default withStyles(style)(FooterComponent)
