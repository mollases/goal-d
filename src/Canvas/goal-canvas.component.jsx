import React, { Component } from 'react';

import SpringyUI from './springy-ui.component.jsx'

const graph = new Springy.Graph();

class GoalCanvas extends Component {
  componentDidMount() {
    var data = {
      'nodes': [
        {label:'power-map',root:true},
        'connections with other people',
        'goals',
        'actionable items',
        'trend setters',
        'entreprenuers',
        'people in politics',
        'global changes',
        'students'
      ],
      'edges': [
        {0:[1, 3, 8, 2]},
        {1:[4, 5, 6, 7, 8]}
      ]
    };

    graph.loadJSON2(data);

    // var nodeFont = "16px Verdana, sans-serif";
    // var edgeFont = "8px Verdana, sans-serif";
    // var stiffness = params.stiffness || 400.0;
    // var repulsion = params.repulsion || 400.0;
    // var damping = params.damping || 0.5;
    // var minEnergyThreshold = params.minEnergyThreshold || 0.00001;
    var that = this;
    SpringyUI({
      id: '#goal-d',
      graph: graph,
      stiffness: 25,
      repulsion: 800,
      damping: .7,
      minEnergyThreshold: 0.0001,
      nodeSelected: function(node) {
        that.node = node;
        that.props.onNodeSelected(node);
      },
      nodeDeselected: function() {
        that.nodeSelected(null);
      }
    });
  }

  render() {
    return (
      <canvas id = "goal-d" data-node={this.node} width={this.props.width} height={this.props.height}/>
    );
  }
}

export default GoalCanvas
