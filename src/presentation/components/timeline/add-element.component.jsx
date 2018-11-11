import React from 'react'

import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
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
      <FlatButton label='Post' onClick={onPost} />
    </CardActions>
  </Card>
)

export default AddElement
