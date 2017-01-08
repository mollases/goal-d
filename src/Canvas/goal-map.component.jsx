import React, { Component } from 'react';

import GoalCanvas from './goal-canvas.component.jsx'
import Timeline from './Timeline/timeline.component.jsx'

class GoalMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedNode : ''
    }
    this.onNodeSelected = this.onNodeSelected.bind(this)
    this.renderTimeline = this.renderTimeline.bind(this)

  }

  onNodeSelected(node){
    this.setState({selectedNode:node});
  }

    render(){
      var contents = this.state.selectedNode;
      if(this.state.selectedNode && this.state.selectedNode.data){
        contents = this.state.selectedNode.data.label;
      }
        return (
            <div>
              <h1>Goal-D "{contents}"</h1>
              <GoalCanvas height={600} width={800} id={this.props.params.id} onNodeSelected={this.onNodeSelected} />
              {this.renderTimeline()}
            </div>
        );
    }

    renderTimeline(){
      if(this.state.selectedNode && this.state.selectedNode.data)
      return <Timeline node={this.state.selectedNode} />
    }
}

export default GoalMap
