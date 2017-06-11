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
    _.forOwn(this.props.childNodes,(v,k,o) => {
      lists.push(v.map((el,index) => {
          return (
              <ListItem primaryText={el.label} key={index}/>
            )
      }))
    })

    return lists;
  }
}

export default ChildrenNodes;
