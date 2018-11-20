import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

const AddElement = ({ value, onChange, onPost }) => (
  <Card>
    <CardContent>
      <Typography variant='h5'>
        add a note
      </Typography>
      <Typography variant='h5'>
        <TextField
          value={value}
          onChange={onChange}
          label='Markdown supported'
          placeholder='Take some notes'
          fullWidth
          multiline
          margin='normal'
        />
      </Typography>
    </CardContent>
    <CardActions>
      <Button color='primary' onClick={onPost}>
        Post
      </Button>
    </CardActions>
  </Card>
)

export default AddElement
