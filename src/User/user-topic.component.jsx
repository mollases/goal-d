import React, { Component } from 'react'
import { Link } from 'react-router'

import TextField from 'material-ui/TextField'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

class UserTopic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      value: this.props.el.notes || ''
    }
    this.renderCardText = this.renderCardText.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.deleteTopic = this.deleteTopic.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  saveNote (event) {
    this.props.saveNote(this.props.el.id, event.target.value)
  }

  deleteTopic (event) {
    this.props.deleteTopic(this.props.el.id)
  }

  render () {
    return (
      <Card>
        <CardTitle
          title={
            <Link to={'/user/map/' + this.props.el.id}>
              {this.props.el.label}
            </Link>
          }
          subtitle={<span onClick={this.deleteTopic}>remove</span>}
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
        <div>
          <p>{this.state.value}</p>
          <FlatButton
            label='edit'
            onClick={() => { this.setState({ edit: true }) }}
          />
        </div>
      )
    } else {
      return (
        <div>
          <TextField
            value={this.state.value}
            onChange={this.handleChange}
            floatingLabelText='TODO: support Markdown'
            rows={5}
            multiLine
            fullWidth
          />
          <FlatButton
            label='close'
            onClick={() => { this.setState({ edit: false }) }}
          />
          <FlatButton
            label='save'
            onClick={(evt) => {
              this.saveNote(evt)
              this.setState({ edit: false })
            }}
          />
        </div>
      )
    }
  }
}

export default UserTopic
