import React from 'react'
import { NavLink } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import ReactMarkdown from 'react-markdown'

const Topic = ({ value, onEdit, go, label, time, cardClass, detailsClass, contentClass }) => (
  <Card className={cardClass}>
    <div className={detailsClass}>
      <CardContent className={contentClass}>
        <Typography variant='h5'>
          {label}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {time}
        </Typography>
        <ReactMarkdown>
          {value}
        </ReactMarkdown>
      </CardContent>
      <CardActions>
        <Button onClick={onEdit}>edit</Button>
        <NavLink to={'/user/map/' + go}>
          <Button>go!</Button>
        </NavLink>
      </CardActions>
    </div>
  </Card>
)

export default Topic
