import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'

class ChildrenNodes extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  render () {
    return (
      <Card>
        <CardTitle title={this.props.node.label} />
        <CardText>
          {this.renderChildren()}
        </CardText>
      </Card>
    )
  }

  renderChildren () {
    return this.props.childNodes.map((el, all) => {
      return (
        <ListItem primaryText={el.data().label} key={el.data().id} />
      )
    })
  }
}

export default ChildrenNodes
