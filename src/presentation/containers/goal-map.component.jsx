import React, { Component } from 'react'
import autoBind from 'react-autobind'

import GoalCanvas from './../components/canvas/goal-canvas.component.jsx'
import Timeline from './../components/timeline/timeline.component.jsx'
import GoalNode from './../components/timeline/goal-node.component.jsx'
import ChildrenNodes from './../components/timeline/children-nodes.component.jsx'

const TimelinewNodes = ({ selectedNode, selectedNodeChildren, store, userId, topic }) => (
  <div className='row col-md-12'>
    <div className='col-md-8'>
      <GoalNode node={selectedNode} />
      <br />
      <Timeline
        store={store}
        nodeId={selectedNode.data().id}
        childNodes={selectedNodeChildren}
        userId={userId}
        topicId={topic} />
    </div>
    <div className='col-md-4'>
      <ChildrenNodes node={selectedNode} childNodes={selectedNodeChildren} />
    </div>
  </div>
)

class GoalMap extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  componentWillMount () {
    this.props.store.subscribe(this.forceUpdate.bind(this))
  }

  render () {
    const stateProps = this.props.store.getState().GoalCanvasReducer
    let renderTimeline = false
    if (stateProps.selectedNode && stateProps.selectedNode.data) {
      renderTimeline = true
    }
    return (
      <div>
        <div className='row col-md-12'>
          <GoalCanvas
            store={this.props.store}
            userId={this.props.auth.getActiveUser()}
            topicId={this.props.match.params.topic} />
          <br />
        </div>
        <div className='row col-md-12'>
          { !renderTimeline ? null
            : <TimelinewNodes
              selectedNode={stateProps.selectedNode}
              selectedNodeChildren={stateProps.selectedNodeChildren}
              store={this.props.store}
              userId={this.props.auth.getActiveUser()}
              topicId={this.props.match.params.topic}
            />
          }
        </div>
      </div>
    )
  }
}

export default GoalMap
