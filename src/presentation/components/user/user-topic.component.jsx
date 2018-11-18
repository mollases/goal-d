import React, { Component } from 'react'
import autoBind from 'react-autobind'

import EditibleTopic from './editable-topic.component.jsx'
import Topic from './topic.component.jsx'

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
        <Topic
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
