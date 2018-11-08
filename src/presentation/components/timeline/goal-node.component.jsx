import React, { Component } from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { green600, amber600, blueGrey600, red600 } from 'material-ui/styles/colors'

const styles = {
  completed: {
    color: green600
  },
  active: {
    color: amber600
  },
  hold: {
    color: blueGrey600
  },
  discontinued: {
    color: red600
  }
}

class GoalNode extends Component {
  render () {
    return (
      <Card>
        <CardTitle
          title={this.props.node.data('label')}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          {JSON.stringify(this.props.node.data())}
        </CardText>
      </Card>
    )
  }
}

export default GoalNode
