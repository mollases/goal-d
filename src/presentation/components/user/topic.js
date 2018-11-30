import React from 'react'
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded'
import ReactMarkdown from 'react-markdown'

const styles = theme => ({
  content: {
    paddingTop: 0,
    paddingBottom: 0
  }
})

const Topic = ({ value, onEdit, go, label, time, classes }) => (
  <Card>
    <CardHeader
      title={label}
      action={
        <NavLink to={'/user/map/' + go}>
          <IconButton>
            <KeyboardArrowRightRounded />
          </IconButton>
        </NavLink>
      }
    />
    <CardContent className={classes.content}>
      <ReactMarkdown>
        {value}
      </ReactMarkdown>
    </CardContent>
    <CardActions>
      <Button onClick={onEdit}>describe {label}</Button>
    </CardActions>
  </Card>
)

export default withStyles(styles)(Topic)
