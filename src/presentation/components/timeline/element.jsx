import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ReactMarkdown from 'react-markdown'

const Element = ({ label, timestamp, body }) => (
  <Card>
    <CardContent>
      <ReactMarkdown>
        {body}
      </ReactMarkdown>
      <Typography variant='subtitle1' color='textSecondary'>
        {new Date(timestamp).toString()}
      </Typography>
      <Typography variant='caption'>
        {label}
      </Typography>
    </CardContent>
  </Card>
)

export default Element
