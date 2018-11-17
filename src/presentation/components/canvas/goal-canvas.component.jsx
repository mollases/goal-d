import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classnames from 'classnames'

import TextField from '@material-ui/core/TextField'
import Save from '@material-ui/icons/Save'
import ActionList from '@material-ui/icons/Help'

import GoalDCytoscape from './goal-canvas-cytoscape.jsx'
import GoalDInstructions from './goal-canvas-instructions.component.jsx'
import { toggleInstructions, nodeSelected, getTopicLabel, postTopicMap, getTopicMap } from './../../../actions/goal-canvas.actions.jsx'

const iconStyles = {
  marginRight: 24
}

const classes = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

class GoalCanvas extends Component {
  constructor (props) {
    super(props)
    this.cy = {}
    autoBind(this)
  }

  componentDidMount () {
    getTopicMap(this.props.topicId, this.props.userId, this.props.store.dispatch)
      .then(() => {
        let reselect = false
        this.cy = GoalDCytoscape()
        this.cy.add(this.props.map)
        let layout = this.cy.layout({ name: 'preset' })
        layout.run()
        this.cy.on('select', e => {
          reselect = true
          this.onNodeSelected(e.target)
        })
        this.cy.on('unselect', e => {
          reselect = false
          setTimeout(() => {
            if (!reselect) {
              this.onNodeSelected()
            }
          }, 200)
        })
        this.cy.ready(e => {
          let s = this.cy.$(':selected')
          if (s.length) {
            this.onNodeSelected(s[0])
          }
        })
      })
      .then(() => {
        if (this.props.label && this.props.label !== '') {
          return
        }
        getTopicLabel(this.props.topicId, this.props.userId, this.props.store.dispatch)
      })
  }

  postMap () {
    let body = {
      label: this.props.label,
      map: this.cy.elements().jsons()
    }
    postTopicMap(this.props.topicId, this.props.userId, body, this.props.store.dispatch)
  }

  componentWillUnmount () {
    this.postMap()
  }

  onNodeSelected (node) {
    if (node) {
      var children = this.cy.edges('[source = "' + node.id() + '"]').targets()
      if (children.size() === 0) {
        children = []
      } else {
        children = children.map((v) => ({
          id: v.id(),
          label: v.data('label')
        }))
      }
      this.props.store.dispatch(nodeSelected(node, node.data('label'), children))
    } else {
      this.props.store.dispatch(nodeSelected({}, '', []))
    }
  }

  onNodeLabelChange (event, extra, useData) {
    var val = ''
    if (event !== undefined) {
      val = event.target && event.target.value
      if (useData) {
        val = this.props.selectedNode.data('label')
      }
      this.props.selectedNode.data('label', val)
    }

    this.props.store.dispatch(nodeSelected(this.props.selectedNode, val, this.props.selectedNodeChildren))
  }

  toggleTips () {
    this.props.store.dispatch(toggleInstructions())
  }

  render () {
    return (
      <div>
        <div className='row col-md-12'>
          <h3 className='col-md-4'>{this.props.label}</h3>
          <TextField
            className={classnames('col-md-4', classes.textField)}
            value={this.props.selectedNodeLabel}
            onChange={this.onNodeLabelChange}
            margin='normal'
            label='add a label'
            variant='outlined'
          />
          <div className='row col-md-4'>
            <Save style={iconStyles} onClick={this.postMap} /> <ActionList style={iconStyles} onClick={this.toggleTips} />
          </div>
        </div>
        <div className='row col-md-12'>
          {this.props.showTips ? <GoalDInstructions /> : ''}
        </div>
        <div className='row col-md-12'>
          <div
            className='col-md-4'
            id='cy'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    map: state.GoalCanvasReducer.map,
    label: state.GoalCanvasReducer.label,
    selectedNode: state.GoalCanvasReducer.selectedNode,
    selectedNodeChildren: state.GoalCanvasReducer.selectedNodeChildren,
    selectedNodeLabel: state.GoalCanvasReducer.selectedNodeLabel,
    showTips: state.GoalCanvasReducer.showTips
  }
}

export default connect(mapStateToProps)(GoalCanvas)
