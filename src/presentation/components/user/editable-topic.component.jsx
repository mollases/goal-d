import React from 'react'
import { NavLink } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

const EditibleTopic = ({ onSave, go, onClose, onTextChange, textValue, label, time, cardClass, detailsClass, contentClass }) => (
  <Card className={cardClass}>
    <div className={detailsClass}>
      <CardContent className={contentClass}>
        <Typography component='h5' variant='h5'>
          {label}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {time}
        </Typography>
        <TextField
          value={textValue}
          onChange={onTextChange}
          label='Markdown supported'
          placeholder='Placeholder'
          fullWidth
          multiline
          margin='normal'
        />
      </CardContent>
      <CardActions>
        <Button onClick={onClose}>close</Button>
        <Button onClick={onSave}>save</Button>
        <NavLink to={'/user/map/' + go}>
          <Button>go!</Button>
        </NavLink>
      </CardActions>
    </div>
  </Card>
)

export default EditibleTopic
