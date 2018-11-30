import React, { Component } from 'react'
import autoBind from 'react-autobind'

import EditibleTopic from './editable-topic.js'
import Topic from './topic.js'

class UserTopic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      value: this.props.el.note || ''
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
    return this.state.edit
      ? <EditibleTopic
        label={this.props.el.label}
        onSave={(evt) => {
          this.saveNote(evt)
          this.setState({ edit: false })
        }}
        go={this.props.el.id}
        onClose={() => { this.setState({ edit: false }) }}
        onTextChange={this.handleChange}
        textValue={this.state.value}
      />
      : <Topic
        label={this.props.el.label}
        value={this.state.value}
        onEdit={() => { this.setState({ edit: true }) }}
        go={this.props.el.id}
      />
  }
}

export default UserTopic
