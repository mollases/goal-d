import React from 'react'
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded'

const styles = theme => ({
  content: {
    paddingTop: 0,
    paddingBottom: 0
  }
})

const EditibleTopic = ({ onSave, go, onClose, onTextChange, textValue, label, time, classes }) => (
  <Card>
    <CardHeader
      title={label}
      action={
        <IconButton>
          <NavLink to={'/user/map/' + go}>
            <KeyboardArrowRightRounded />
          </NavLink>
        </IconButton>
      }
    />
    <CardContent className={classes.content}>
      <TextField
        value={textValue}
        onChange={onTextChange}
        label={'What is ' + label + ' about'}
        placeholder='Markdown supported'
        fullWidth
        multiline
        margin='normal'
      />
    </CardContent>
    <CardActions>
      <Button onClick={onClose}>close</Button>
      <Button onClick={onSave}>save</Button>
    </CardActions>
  </Card>
)

export default withStyles(styles)(EditibleTopic)
