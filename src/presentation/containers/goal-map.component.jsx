import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import GoalCanvas from './../components/canvas/goal-canvas.component.jsx'
import Timeline from './../components/timeline/timeline.component.jsx'
import GoalNode from './../components/timeline/goal-node.component.jsx'
import ChildrenNodes from './../components/timeline/children-nodes.component.jsx'

const TimelinewNodes = ({ selectedNode, selectedNodeChildren, store, userId, topicId }) => {
  return (
    <div className='row col-md-12'>
      <div className='col-md-8'>
        <GoalNode
          store={store}
          node={selectedNode}
          label={selectedNode.data('label')}
        />
        <br />
        <Timeline
          store={store}
          nodeId={selectedNode.id()}
          childNodes={selectedNodeChildren}
          userId={userId}
          topicId={topicId} />
      </div>
      <div className='col-md-4'>
        <ChildrenNodes node={selectedNode} childNodes={selectedNodeChildren} />
      </div>
    </div>
  )
}

class GoalMap extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  render () {
    let renderTimeline = false
    if (this.props.selectedNode && this.props.selectedNode.data) {
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
              selectedNode={this.props.selectedNode}
              selectedNodeChildren={this.props.selectedNodeChildren}
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

const mapStateToProps = state => {
  return {
    selectedNode: state.GoalCanvasReducer.selectedNode,
    selectedNodeChildren: state.GoalCanvasReducer.selectedNodeChildren
  }
}

export default connect(mapStateToProps)(GoalMap)
