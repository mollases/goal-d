import React, { Component } from 'react'
import SpringyUI from './springy-ui.component.jsx'

class GoalCanvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      graph : new Springy.Graph()
    }
  }

  componentDidMount() {
    var graph = this.state.graph;
    fetch('/user')
    .then(function(response) {
      response.json().then(function(response2){
        graph.loadJSON2(response2);
        console.log(response2);
      });
    });
    // var data = {
    //   'nodes': [
    //     {label:'power-map',root:true},
    //     {label:'connections with other people'},
    //     {label:'goals'},
    //     {label:'actionable items'},
    //     {label:'trend setters'},
    //     {label:'entreprenuers'},
    //     {label:'people in politics'},
    //     {label:'global changes'},
    //     {label:'students'}
    //   ],
    //   'edges': [
    //     {0:[1, 3, 8, 2]},
    //     {1:[4, 5, 6, 7, 8]}
    //   ]
    // };


    // console.log(JSON.stringify(this.state.graph.condensed()));

    // var nodeFont = "16px Verdana, sans-serif";
    // var edgeFont = "8px Verdana, sans-serif";
    // var stiffness = params.stiffness || 400.0;
    // var repulsion = params.repulsion || 400.0;
    // var damping = params.damping || 0.5;
    // var minEnergyThreshold = params.minEnergyThreshold || 0.00001;
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

    fetch("/user",
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
    console.log(node);
  }

  render() {
    return (
      <canvas id = "goal-d" data-node={this.node} width={this.props.width} height={this.props.height}/>
    );
  }
}

export default GoalCanvas
