import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

class Element extends Component {
  render () {
    let d = new Date(this.props.content.timestamp).toString()
    return (
      <Card>
        <CardHeader
          title={this.props.content.label}
          subtitle={d}
        />
        <CardText>
          {this.props.content.body}
        </CardText>
      </Card>
    )
  }
}

export default Element
