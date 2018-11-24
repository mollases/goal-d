import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import Grid from '@material-ui/core/Grid'

import GoalCanvas from './../components/canvas/goal-canvas-interface.jsx'
import Timeline from './../components/timeline/timeline.jsx'
import GoalNode from './../components/timeline/goal-node.jsx'
import ChildrenNodes from './../components/timeline/children-nodes.jsx'

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
        <ChildrenNodes label={selectedNode.data('label')} childNodes={selectedNodeChildren} />
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
      <Grid container spacing={24}>
        <Grid md={12} xs={12} item>
          <GoalCanvas
            store={this.props.store}
            userId={this.props.auth.getActiveUser()}
            topicId={this.props.match.params.topic} />
          <br />
        </Grid>
        <Grid md={12} xs={12} item>
          { !renderTimeline ? null
            : <TimelinewNodes
              selectedNode={this.props.selectedNode}
              selectedNodeChildren={this.props.selectedNodeChildren}
              store={this.props.store}
              userId={this.props.auth.getActiveUser()}
              topicId={this.props.match.params.topic}
            />
          }
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedNode: state.GoalCanvasInterfaceReducer.selectedNode,
    selectedNodeChildren: state.GoalCanvasInterfaceReducer.selectedNodeChildren
  }
}

export default connect(mapStateToProps)(GoalMap)
