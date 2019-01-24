import React from 'react'
import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NavBar from '../User/NavBarContainer'

const faqList = [
  {
    title: 'What is Milestone?',
    content: 'Milestone is a decentralized platform running on LoomX network, providing  milestone-driven audits and governance fro cryptocurrency projects. Project token holders receive voting power, which can then be delegated to our validators who are responsible for rating completeness of project milestones. Our mission is to identify and share concrete and consistent trading and investment opportunities based on solid research and milestone-driven rating evidence provided by our validators. '
  },
  {
    title: 'What is a validator?',
    content: 'A validator is an active member of Milestone community that has the right to rate project milestones and conforms to the rules of the Milestone community. '
  },
  {
    title: 'How to become a validator?',
    content: 'During alpha stage, please send us an email to dev@ventureum.io. We will verify and review your application. In the beta version, validators will be elected by our community.'
  },
  {
    title: 'What is Loom Network?',
    content: 'Loom Network is building a fundamental infrastructure platform to help Ethereum scale. It allows developers to run large-scale applications, and is the first Ethereum scaling solution to be live in production. In short, you can think of Loom Network as EOS on top of Ethereum.'
  }
]

function FAQComponent ({ ...props }) {
  const { classes, history, location } = props
  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item>
        <Grid container direction='column' justify='center'>
          <Grid item>
            <NavBar history={history} location={location} />
          </Grid>
          <Grid item className={classes.sectionFAQ}>
            <Grid container direction='column' alignItems='center' justify='center'>
              <Grid item>
                <Typography className={classes.titleFAQ} variant='h4'>
                  Everything You Need to Know About Milestone
                </Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={8} >
                {faqList.map((item) => (
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant='subtitle'> {item.title} </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {item.content}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>))
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const style = theme => ({
  root: {
    flex: 1
  },
  sectionFAQ: {
    marginTop: '30px',
    marginBottom: '30px'
  },
  titleFAQ: {
    marginBottom: 16,
    color: '#333333',
    alignSelf: 'flex-start'
  }
})

export default withStyles(style)(FAQComponent)
