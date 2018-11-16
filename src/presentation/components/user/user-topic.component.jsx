import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { NavLink } from 'react-router-dom'

import TextField from 'material-ui/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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

const EditibleTopic = ({ onSave, go, onClose, onTextChange, textValue }) => (
  <div>
    <TextField
      value={textValue}
      onChange={onTextChange}
      label='TODO: support Markdown'
      placeholder='Placeholder'
      fullWidth
      multiline
      className={classes.textField}
      margin='normal'
    />
    <Button onClick={onClose}>close</Button>
    <Button onClick={onSave}>save</Button>
    <NavLink to={'/user/map/' + go}>
      <Button>go!</Button>
    </NavLink>
  </div>
)

const StaticTopic = ({ value, onEdit, go }) => (
  <div>
    <p>{value}</p>
    <Button onClick={onEdit}>edit</Button>
    <NavLink to={'/user/map/' + go}>
      <Button>go!</Button>
    </NavLink>
  </div>
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
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h4' variant='h4'>
              {this.props.el.label}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {this.state.time}
            </Typography>
            <Typography variant='h5'>
              {this.renderCardText()}
            </Typography>
          </CardContent>
        </div>
      </Card>
    )
  }

  renderCardText () {
    if (!this.state.edit) {
      return (
        <StaticTopic
          value={this.state.value}
          onEdit={() => { this.setState({ edit: true }) }}
          go={this.props.el.id}
        />
      )
    } else {
      return (
        <EditibleTopic
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
