import React, { Component } from 'react';

import GoalCanvas from './goal-canvas.component.jsx'
import Timeline from './Timeline/timeline.component.jsx'

class GoalMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedNode : null,
      childNodes:[]
    }
    this.onNodeSelected = this.onNodeSelected.bind(this)
    this.renderTimeline = this.renderTimeline.bind(this)
  }

  onNodeSelected(node,childNodes){
    this.setState({selectedNode:node,childNodes:childNodes});
  }

    render(){
        return (
          <div>
            <GoalCanvas width={1000} id={this.props.params.id} onNodeSelected={this.onNodeSelected} topicId={this.props.params.topic} />
            {this.renderTimeline()}
          </div>
        );
    }

    renderTimeline(){
      if(this.state.selectedNode && this.state.selectedNode.data)
      return (
        <div key="0">
          <h1 className="text-center">{this.state.selectedNode.data.label}</h1>
          <Timeline nodeId={this.state.selectedNode.id} childNodes={this.state.childNodes} id={this.props.params.id} topicId={this.props.params.topic}/>
        </div>
      )
    }
}

export default GoalMap
