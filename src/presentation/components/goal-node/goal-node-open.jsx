import React from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
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
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

const GoalNodeOpen = ({ label, expandClick, renderExtra, classes }) => (
  <Card>
    <CardHeader
      title={label}
      action={
        <IconButton
          className={classnames(classes.expand, classes.expandOpen)}
          onClick={expandClick}
          aria-expanded
          aria-label='Show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      }
    />
    {/* <CardActions className={classes.actions} disableActionSpacing /> */}
    <Collapse in timeout='auto' unmountOnExit>
      <CardContent>
        {/* <Typography> */}
        {renderExtra()}
        {/* </Typography> */}
      </CardContent>
    </Collapse>
  </Card>
)

export default withStyles(styles)(GoalNodeOpen)
