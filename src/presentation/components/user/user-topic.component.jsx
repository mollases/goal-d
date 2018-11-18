import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { NavLink } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

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
  }
})

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
          label='TODO: support Markdown'
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

const StaticTopic = ({ value, onEdit, go, label, time, cardClass, detailsClass, contentClass }) => (
  <Card className={cardClass}>
    <div className={detailsClass}>
      <CardContent className={contentClass}>
        <Typography component='h5' variant='h5'>
          {label}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {time}
        </Typography>
        <Typography variant='body1'>
          {value}
        </Typography>
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

class UserTopic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      value: this.props.el.note || '',
      time: new Date(this.props.el.time).toLocaleDateString()
    }
    autoBind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  saveNote (event) {
    this.props.saveNote(this.props.el.id, this.state.value)
  }

  deleteTopic (event) {
    this.props.deleteTopic(this.props.el.id)
  }

  render () {
    if (!this.state.edit) {
      return (
        <StaticTopic
          label={this.props.el.label}
          time={this.state.time}
          cardClass={classes.card}
          detailsClass={classes.details}
          contentClass={classes.content}
          value={this.state.value}
          onEdit={() => { this.setState({ edit: true }) }}
          go={this.props.el.id}
        />
      )
    } else {
      return (
        <EditibleTopic
          label={this.props.el.label}
          time={this.state.time}
          cardClass={classes.card}
          detailsClass={classes.details}
          contentClass={classes.content}
          onSave={(evt) => {
            this.saveNote(evt)
            this.setState({ edit: false })
          }}
          go={this.props.el.id}
          onClose={() => { this.setState({ edit: false }) }}
          onTextChange={this.handleChange}
          textValue={this.state.value}
        />
      )
    }
  }
}

export default UserTopic
