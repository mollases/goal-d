import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { Link } from 'react-router'

import TextField from 'material-ui/TextField'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

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
        <div>
          <p>{this.state.value}</p>
          <FlatButton
            label='edit'
            onClick={() => { this.setState({ edit: true }) }}
          />
          <Link to={'/user/map/' + this.props.el.id}>
              go!
          </Link>
        </div>
      )
    } else {
      return (
        <div>
          <TextField
            value={this.state.value}
            onChange={this.handleChange}
            floatingLabelText='TODO: support Markdown'
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
          <Link to={'/user/map/' + this.props.el.id}>
              go!
          </Link>
        </div>
      )
    }
  }
}

export default UserTopic
