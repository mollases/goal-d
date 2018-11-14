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
    if (this.props.childNodes && this.props.childNodes.length) {
      return this.props.childNodes.map((el) => {
        return (
          <ListItem primaryText={el.label} key={el.id} />
        )
      })
    }
    return (<ListItem primaryText='Select a node with children to see its children here' />)
  }
}

export default ChildrenNodes
