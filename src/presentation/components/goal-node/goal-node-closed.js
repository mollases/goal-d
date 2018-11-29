import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  }
})

const GoalNodeClosed = ({ label, expandClick, classes }) => (
  <Card>
    <CardHeader
      title={label}
      action={
        <IconButton
          className={classes.expand}
          onClick={expandClick}
          aria-expanded={false}
          aria-label='Show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      }
    />
  </Card>
)

export default withStyles(styles)(GoalNodeClosed)
