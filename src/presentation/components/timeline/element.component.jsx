import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ReactMarkdown from 'react-markdown'

const classes = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})

const Element = ({ label, timestamp, body }) => (
  <Card className={classes.card}>
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <Typography variant='body1'>{label}</Typography>
        <ReactMarkdown>
          {body}
        </ReactMarkdown>
        <Typography variant='subtitle1' color='textSecondary'>
          {new Date(timestamp).toString()}
        </Typography>
      </CardContent>
    </div>
  </Card>
)

export default Element
