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
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  }
})

const EditibleTopic = ({ onSave, go, onClose, onTextChange, textValue, label, time, classes }) => (
  <Card className={classes.card}>
    <div className={classes.details}>
      <CardHeader
        title={label}
        subheader={time}
        action={
          <NavLink to={'/user/map/' + go}>
            <IconButton>
              <KeyboardArrowRightRounded />
            </IconButton>
          </NavLink>
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
    </div>
  </Card>
)

export default withStyles(styles)(EditibleTopic)
