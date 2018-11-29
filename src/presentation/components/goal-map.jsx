import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Timeline from './timeline/timeline.jsx'
import GoalNode from './goal-node/goal-node.jsx'
import ChildrenNodes from './timeline/children-nodes.jsx'
import GoalCanvas from './canvas/goal-canvas-interface.jsx'

const GoalMap = ({ store, user, match, renderTimeline, selectedNode, selectedNodeChildren }) => (
  <Grid container spacing={24}>
    <Grid md={12} xs={12} item>
      <GoalCanvas
        store={store}
        userId={user}
        topicId={match.params.topic} />
      <br />
    </Grid>
    <Grid md={12} xs={12} item>
      { renderTimeline &&
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
            userId={user}
            topicId={match.params.topic} />
        </div>
        <div className='col-md-4'>
          <ChildrenNodes label={selectedNode.data('label')} childNodes={selectedNodeChildren} />
        </div>
      </div>
      }
    </Grid>
  </Grid>
)

const mapStateToProps = state => {
  const { selectedNode, selectedNodeChildren } = state.GoalCanvasInterfaceReducer
  const renderTimeline = !!(selectedNode && selectedNode.data)
  return {
    selectedNode,
    selectedNodeChildren,
    renderTimeline
  }
}

export default connect(mapStateToProps)(GoalMap)
