import React from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import { GoalCanvasInterface } from './canvas'
import GoalNode from '../containers/goal-node.js'
import { ChildrenNodes } from './timeline'

const GoalMapDemo = ({ user, store, selectedNode, selectedNodeChildren, renderTimeline }) => (
  <Grid container spacing={24}>
    <Grid md={12} xs={12} item>
      <GoalCanvasInterface
        demo
        label='Demo'
        store={store}
        userId={user} />
      <br />
    </Grid>
    <Grid md={12} xs={12} item>
      {renderTimeline &&
      <div className='row col-md-12'>
        <div className='col-md-8'>
          <GoalNode
            store={store}
            node={selectedNode}
            label={(selectedNode && selectedNode.data('label')) || null}
          />
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

export default connect(mapStateToProps)(GoalMapDemo)
