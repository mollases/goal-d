import React, {Component} from 'react';
import _ from 'lodash';

import AddElement from './add-element.component.jsx';
import Element from './element.component.jsx';


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

  callRefresh(nodeId,childNodes){
    let that = this;
    let nodeSearch = nodeId === undefined ? this.props.nodeId : nodeId;
    var children = childNodes === undefined ? this.props.childNodes : childNodes;
    let extra = ''
    if(children.length){
      extra = '/extra/' + children.map(function(i){return i.id}).join(',')
    }
    let get = '/user-details/'+this.props.id + '/topic/' + this.props.topicId + '/post/' + nodeSearch + extra;
    console.log(get)
    fetch(get)
    .then(function(response) {
      response.json().then(function(response2){
        let sorted = _.sortBy(_.flatten(response2).map(JSON.parse),'timestamp').reverse()
        let labeled = _.forEach(sorted,function(i){
          i.label = _.filter(children,{id:i.nodeId})[0] || '';
          if(i.label !== ''){
            i.label=i.label.label;
          }
        })
        console.log(children)
        that.setState({contents:sorted})
      });
    });
  }

  componentDidMount() {
    this.callRefresh(this.props.nodeId,);
  }

  componentWillReceiveProps(nextProps){
    let now = this.props.nodeId;
    let future = nextProps.nodeId;
    if(now !== future){
    console.log(now + "=>"+ future)
      this.callRefresh(future,nextProps.childNodes);
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
      return (
        <div className="row col-md-8" key={index}>
          <Element content={el}/>
        </div>)
    });
  }
}

export default Timeline
