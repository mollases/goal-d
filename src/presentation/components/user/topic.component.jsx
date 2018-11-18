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
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  }
})

const Topic = ({ value, onEdit, go, label, time, classes }) => (
  <Card className={classes.card}>
    <div className={classes.details}>
      <CardHeader
        title={label}
        subheader={time}
        action={
          <IconButton>
            <NavLink to={'/user/map/' + go}>
              <KeyboardArrowRightRounded />
            </NavLink>
          </IconButton>
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
    </div>
  </Card>
)

export default withStyles(styles)(Topic)
