import React, { Component } from 'react'
import autoBind from 'react-autobind'

import GoalCanvas from './../canvas/goal-canvas.component.jsx'
import Timeline from './../timeline/timeline.component.jsx'
import GoalNode from './../timeline/goal-node.component.jsx'
import ChildrenNodes from './../timeline/children-nodes.component.jsx'

const TimelinewNodes = ({ selectedNode, selectedNodeChildren, auth, store, user, topic }) => (
  <div className='row col-md-12'>
    <div className='col-md-8'>
      <GoalNode node={selectedNode} />
      <br />
      <Timeline
        store={store}
        auth={auth}
        nodeId={selectedNode.data().id}
        childNodes={selectedNodeChildren}
        id={user}
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
            auth={this.props.auth}
            id={this.props.auth.getActiveUser()}
            topicId={this.props.match.params.topic} />
          <br />
        </div>
        <div className='row col-md-12'>
          { !renderTimeline ? null
            : <TimelinewNodes
              selectedNode={stateProps.selectedNode}
              selectedNodeChildren={stateProps.selectedNodeChildren}
              auth={this.props.auth}
              store={this.props.store}
              user={this.props.auth.getActiveUser()}
              topicId={this.props.match.params.topic}
            />
          }
        </div>
      </div>
    )
  }
}

export default GoalMap
