import React, {Component} from 'react';
import _ from 'lodash';

import AddElement from './add-element.component.jsx';
import Element from './element.component.jsx';

import Config from './../Services/config.service.jsx';

var config = new Config();

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
    let _childNodes = _.keys(childNodes || []);
    var children = _childNodes.join(',');

    config.getUserTopicPostList(this.props.id,this.props.topicId,nodeId,_childNodes)
    .then(function(response) {
      response.json().then(function(response2){
        let sorted = _.sortBy(_.flatten(response2).map(JSON.parse),'timestamp').reverse()
        _.forEach(sorted,function(i){
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
    this.callRefresh(this.props.nodeId,this.props.childNodes);
  }

  componentWillReceiveProps(nextProps){
    let now = this.props.nodeId;
    let future = nextProps.nodeId;
    if(now !== future){
      this.callRefresh(future,nextProps.childNodes);
    }
  }

  render(){
    return(
      <div>
        <AddElement
          onSubmitPressed={this.callRefresh.bind(this.props.nodeId,this.props.childNodes)}
          nodeId={this.props.nodeId}
          topicId={this.props.topicId}
          id={this.props.id}/>
        <br/>
        {this.renderElements()}
      </div>
    );
  }

  renderElements(){
    return this.state.contents.map(function(el,index,all){
      return (
        <div key={index}>
          <Element content={el}/>
          <br/>
        </div>
      );
    })
  }
}

export default Timeline
