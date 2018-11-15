import React from 'react'

import { Card, CardActions, CardHeader } from 'material-ui/Card'
import Button from '@material-ui/core/Button'
import TextField from 'material-ui/TextField'

const AddElement = ({ value, onChange, onPost }) => (
  <Card>
    <CardHeader title='Add an Element' />
    <TextField
      value={value}
      onChange={onChange}
      floatingLabelText='TODO: support Markdown'
      rows={5}
      multiLine
      fullWidth
    />
    <CardActions>
      <Button onClick={onPost} >Post</Button>
    </CardActions>
  </Card>
)

export default AddElement
