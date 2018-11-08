import React, { Component } from 'react'
import autoBind from 'react-autobind'
import Config from './../../../services/config.service.jsx'

import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

class AddElement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    autoBind(this)
  }

  onClickHandler (evt) {
    let body = { body: this.state.value, userId: this.props.userId, nodeId: this.props.nodeId, topicId: this.props.topicId }
    Config.postUserTopicOnPost(this.props.userId, this.props.topicId, this.props.nodeId, body)
      .then(() => { this.props.onSubmitPressed() })
      .then(() => {
        this.setState({ value: '' })
      })
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    return (
      <Card>
        <CardHeader title='Add an Element' />
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText='TODO: support Markdown'
          rows={5}
          multiLine
          fullWidth
        />
        <CardActions>
          <FlatButton label='Post' onClick={this.onClickHandler} />
        </CardActions>
      </Card>
    )
  }
}

export default AddElement

// <div>
//   <textarea className="form-control" rows="3" value={this.state.value} onChange={this.handleChange} />
//   <button type="button" className="btn btn-default btn-sm">
//     <span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span> Pin Note
//   </button>
// </div>
