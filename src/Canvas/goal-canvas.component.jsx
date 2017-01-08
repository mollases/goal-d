import React, { Component } from 'react'
import SpringyUI from './springy-ui.component.jsx'

class GoalCanvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      graph : new Springy.Graph()
    }
    this.onNodeSelected =this.onNodeSelected.bind(this)
  }

  componentDidMount() {
    var graph = this.state.graph;
    fetch('/user-details/'+this.props.id)
    .then(function(response) {
      response.json().then(function(response2){
        graph.loadJSON2(response2);
      });
    });

    var that = this;
    SpringyUI({
      id: '#goal-d',
      graph: this.state.graph,
      stiffness: 25,
      repulsion: 800,
      damping: .7,
      minEnergyThreshold: 0.0001,
      nodeSelected: that.onNodeSelected,
      nodeDeselected: function() {
        that.nodeSelected(null);
      }
    });
  }

  componentWillUnmount(){

    fetch('/user-details/'+this.props.id,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(this.state.graph.condensed())
    })
    .then(function(res){ console.log(res) })
  }

  onNodeSelected(node){
    this.props.onNodeSelected(node);
    console.log(node);
  }

  render() {
    return (
      <canvas id = "goal-d" data-node={this.node} width={this.props.width} height={this.props.height}/>
    );
  }
}

export default GoalCanvas
