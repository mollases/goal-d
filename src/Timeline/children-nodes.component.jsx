import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import _ from 'lodash'

class ChildrenNodes extends Component {
  constructor(props) {
    super(props)
    this.renderChildren = this.renderChildren.bind(this)
  }

  render() {
    return (
      <Card>
        <CardTitle title={this.props.node.label} />
        <CardText>
          {this.renderChildren()}
        </CardText>
      </Card>
    );
  }

  renderChildren() {
    var lists = [];
    return _.map(this.props.childNodes,(el,all) => {
      return (
          <ListItem primaryText={el.data().label} key={el.data().id}/>
        )
    })

    return lists;
  }
}

export default ChildrenNodes;
