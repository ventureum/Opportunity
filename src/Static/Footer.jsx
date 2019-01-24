import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import logo from '../loomLogo.png'

class FooterComponent extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <footer className={classes.root}>
        <Grid container direction='column'>
          <Grid item>
            <Grid container direction='row'>
              <Grid item xl={6} ld={6} md={6} sm={12} xs={12}>
                <Grid container>
                  <Grid item xl={4} md={4} sm={4} xs={4}>
                    <List>
                      <ListItem className={classes.listItem}>
                        <Typography variant='subtitle1' align='left' className={classes.listTitle}>
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
                        <Typography variant='subtitle1' className={classes.listTitle}>
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
                        <Typography variant='subtitle1' className={classes.listTitle}>
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
                        <a className={classes.link} href='mailto: support@milest.one'>
                          <Typography className={classes.listContent}>
                            Contact Us
                          </Typography>
                        </a>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <a className={classes.link} target='_blank' rel='noopener noreferrer' href='https://docs.google.com/document/u/1/d/e/2PACX-1vQ85R-CCX_C2R4ZNlJNeXsJ8od-xrWfEEdecIV8IPfF98K4LC8bubsCQ4MtLPbI6IdM7u6lRuYHIl0m/pub'>
                          <Typography className={classes.listContent}>
                            Privacy Policy
                          </Typography>
                        </a>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <a className={classes.link} target='_blank' rel='noopener noreferrer' href='https://docs.google.com/document/d/e/2PACX-1vScWE32Rzf-z8OYmzS9mKTBcpVftWMbeR_BfbhmeJxHDF4jaiYXyUfPOtGif7mI6RSpoQ19onaawdYE/pub'>
                          <Typography className={classes.listContent}>
                            Terms
                          </Typography>
                        </a>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={6} ld={6} md={6} sm={12} xs={12}>
                <Grid container direction='column' justify='center' alignItems='center' className={classes.poweredByLoomContainer}>
                  <Grid item>
                    <img className={classes.loomLogo} src={logo} alt='' />
                    <Typography align='left' className={classes.poweredByLoom}>Powered by LoomX</Typography>
                  </Grid>
                  <a className={classes.loomExplorerContainer} target='_blank' rel='noopener noreferrer' href='http://explorer.milest.one/'>
                    <Typography className={classes.poweredByLoom}>
                      View Loom Block Explorer
                    </Typography>
                  </a>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.copyRight}>
              <Grid container direction='row' justify='center'>
                <Grid item>
                  <Typography className={classes.copyright}>
                    &copy; {'2017 - '}{1900 + new Date().getYear()} Ventureum Inc. All rights reserved.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    )
  }
}

const style = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
      paddingLeft: '140px',
      paddingRight: '140px'
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'right',
      paddingLeft: '40px',
      paddingRight: '40px'
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'right',
      paddingLeft: '20px',
      paddingRight: '20px'
    },
    paddingTop: '60px',
    backgroundColor: '#333333'
  },
  link: {
    textDecoration: 'none'
  },
  listItem: {
    justifyContent: 'flex-start',
    paddingLeft: '0px'
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
    paddingTop: '10px',
    [theme.breakpoints.up('md')]: {
      textAlign: 'right'
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  poweredByLoom: {
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.15px'
  },
  poweredByLoomContainer: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '8px'
    }
  },
  loomExplorerContainer: {
    padding: '15px 45px 15px 45px',
    borderWidth: '1px',
    borderColor: '#ffffff',
    borderRadius: '8px',
    marginTop: '30px',
    borderStyle: 'solid',
    textDecoration: 'none',
    display: 'block'
  },
  loomLogo: {
    height: '32px',
    width: 'auto',
    marginBottom: '6px'
  },
  copyRight: {
    marginTop: '8px'
  }
})

export default withStyles(style)(FooterComponent)
