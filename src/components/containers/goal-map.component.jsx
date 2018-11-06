import React, { Component } from 'react'
import autoBind from 'react-autobind'

import GoalCanvas from './../canvas/goal-canvas.component.jsx'
import Timeline from './../timeline/timeline.component.jsx'
import GoalNode from './../timeline/goal-node.component.jsx'
import ChildrenNodes from './../timeline/children-nodes.component.jsx'

class GoalMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedNode: null,
      childNodes: []
    }
    autoBind(this)
  }

  onNodeSelected (node, childNodes) {
    this.setState({ selectedNode: node, childNodes: childNodes })
  }

  render () {
    return (
      <div>
        <div className='row col-md-12'>
          <GoalCanvas
            auth={this.props.auth}
            id={this.props.auth.getActiveUser()}
            onNodeSelected={this.onNodeSelected}
            topicId={this.props.match.params.topic} />
          <br />
        </div>
        <div className='row col-md-12'>
          {this.renderTimeline()}
        </div>
      </div>
    )
  }

  renderTimeline () {
    if (this.state.selectedNode && this.state.selectedNode.data) {
      return (
        <div className='row col-md-12'>
          <div className='col-md-8'>
            <GoalNode node={this.state.selectedNode} />
            <br />
            <Timeline
              auth={this.props.auth}
              nodeId={this.state.selectedNode.data().id}
              childNodes={this.state.childNodes}
              id={this.props.auth.getActiveUser()}
              topicId={this.props.match.params.topic} />
          </div>
          <div className='col-md-4'>
            <ChildrenNodes node={this.state.selectedNode} childNodes={this.state.childNodes} />
          </div>
        </div>
      )
    }
  }
}

export default GoalMap
