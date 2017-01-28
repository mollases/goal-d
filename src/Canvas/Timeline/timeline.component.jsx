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
    fetch('/user-details/'+this.props.id + '/topic/' + this.props.topicId + '/post/' + (nodeId || this.props.nodeId))
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
    let now = this.props.nodeId;
    let future = nextProps.nodeId;
    if(now !== future){
      this.callRefresh(future);
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col-md-7">
          <AddElement onSubmitPressed={this.callRefresh} nodeId={this.props.nodeId} topicId={this.props.topicId} id={this.props.id}/>
        </div>
        <div className="col-md-5">
          <div className="btn-group" role="group" aria-label="...">
            <button type="button" className="btn btn-default btn-success">Completed</button>
            <button type="button" className="btn btn-default btn-warning">Active</button>
            <button type="button" className="btn btn-default btn-hold">On Hold</button>
            <button type="button" className="btn btn-default btn-danger">Discontinued</button>
          </div>
        </div>

        {this.renderElements()}
      </div>
    );
  }

  renderElements(){
    return this.state.contents.map(function(el,index,all){
      let e = JSON.parse(el);
      return (
        <div className="row col-md-8">
          <Element content={e} key={index}/>
        </div>)
    });
  }
}

export default Timeline
