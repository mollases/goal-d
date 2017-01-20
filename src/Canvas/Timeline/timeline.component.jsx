import React, {Component} from 'react';
import { Link } from 'react-router';

import AddElement from './add-element.component.jsx'
import Element from './element.component.jsx'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: []
    }
    this.renderElements = this.renderElements.bind(this)
    this.callRefresh = this.callRefresh.bind(this)
    this.renderElements = this.renderElements.bind(this)
  }

  callRefresh(nodeId){
    let that = this;
    fetch('/user-details/'+this.props.id + '/post/' + (nodeId || this.props.node.data.id))
    .then(function(response) {
      response.json().then(function(response2){
        that.setState({contents:response2})
      });
    });
  }

  componentDidMount() {
    this.callRefresh();
  }

  componentWillReceiveProps(nextProps){
    let now = JSON.stringify(this.props.node);
    let future = JSON.stringify(nextProps.node) // Check if it's a new user, you can also use some unique, like the ID
    if(now !== future){
      this.callRefresh(nextProps.node.data.id);
    }
  }

  render(){
    return(
      <div>
        <AddElement onSubmitPressed={this.callRefresh} node={this.props.node} id={this.props.id}/>
        {this.renderElements()}
      </div>
    );
  }

  renderElements(){
    return this.state.contents.map(function(el,index,all){
      let e = JSON.parse(el);
      return (<Element content={e} key={index}/>)
    });
  }
}

export default Timeline
