import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { NavLink } from 'react-router-dom'

import TextField from 'material-ui/TextField'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const EditibleTopic = ({ onSave, go, onClose, onTextChange, textValue }) => (
  <div>
    <TextField
      value={textValue}
      onChange={onTextChange}
      floatingLabelText='TODO: support Markdown'
      multiLine
      fullWidth
    />
    <FlatButton
      label='close'
      onClick={onClose}
    />
    <FlatButton
      label='save'
      onClick={onSave}
    />
    <NavLink to={'/user/map/' + go}>
        go!
    </NavLink>
  </div>
)

const StaticTopic = ({ value, onEdit, go }) => (
  <div>
    <p>{value}</p>
    <FlatButton
      label='edit'
      onClick={onEdit}
    />
    <NavLink to={'/user/map/' + go}>
        go!
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
      <Card>
        <CardTitle
          title={this.props.el.label}
          subtitle={<span onClick={this.deleteTopic}>{this.state.time}</span>}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          {
            this.renderCardText()
          }
        </CardText>
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
