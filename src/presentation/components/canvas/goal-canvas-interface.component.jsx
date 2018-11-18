import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classnames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Save from '@material-ui/icons/Save'
import Help from '@material-ui/icons/Help'

import Theme from './../../../theme.jsx'
import GoalDCytoscape from './goal-canvas-cytoscape.jsx'
import GoalDInstructions from './goal-canvas-instructions.component.jsx'
import { toggleInstructions, nodeSelected, getTopicLabel, postTopicMap, getTopicMap } from '../../../actions/goal-canvas-interface.actions.jsx'

const styles = theme => ({
  cy: {
    background: Theme.cy.background
  },
  icon: {
    marginLeft: 12,
    marginRight: 20,
    height: '3em',
    verticalAlign: 'middle'
  },
  iconParent: {
    textAlign: 'center'
  }
})

class GoalCanvasInterface extends Component {
  constructor (props) {
    super(props)
    this.cy = {}
    autoBind(this)
  }

  componentDidMount () {
    getTopicMap(this.props.topicId, this.props.userId, this.props.store.dispatch)
      .then(() => {
        let reselect = false
        this.cy = GoalDCytoscape({
          unselected: Theme.cy.primary,
          selected: Theme.cy.secondary,
          handleColor: Theme.cy.context
        })
        this.cy.add(this.props.map)
        let layout = this.cy.layout({ name: 'preset' })
        layout.run()
        this.cy.on('select', e => {
          reselect = true
          this.onNodeSelected(e.target)
        })
        this.cy.on('add', e => {
          reselect = true
          e.target.select()
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
      document.getElementById('nodeLabeler').focus()
      var children = this.cy.edges('[source = "' + node.id() + '"]').targets()
      if (children.size() === 0) {
        children = []
      } else {
        children = children.map((v) => ({
          id: v.id(),
          label: v.data('label'),
          show: true
        }))
      }
      this.props.store.dispatch(nodeSelected(node, node.data('label'), children))
    } else {
      this.props.store.dispatch(nodeSelected({}, '', []))
    }
  }

  onNodeLabelChange (event) {
    var val = ''
    if (event !== undefined) {
      val = event.target && event.target.value
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
          <h3 className={classnames('col-md-4', 'col-xs-3', this.props.classes.header)} >{this.props.label}</h3>
          <TextField
            className={classnames('col-md-4', 'col-xs-6', this.props.classes.textField)}
            value={this.props.selectedNodeLabel}
            onChange={this.onNodeLabelChange}
            id='nodeLabeler'
            margin='normal'
            label='add a label'
            variant='outlined'
          />
          <div className={classnames('col-md-4', 'col-xs-3', this.props.classes.iconParent)}>
            <Save onClick={this.postMap} className={this.props.classes.icon} />
            <Help onClick={this.toggleTips} className={this.props.classes.icon} />
          </div>
        </div>
        <div className='row col-md-12'>
          {this.props.showTips ? <GoalDInstructions /> : ''}
        </div>
        <div className='row col-md-12'>
          <Paper
            className={this.props.classes.cy}
            id='cy'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    map: state.GoalCanvasInterfaceReducer.map,
    label: state.GoalCanvasInterfaceReducer.label,
    selectedNode: state.GoalCanvasInterfaceReducer.selectedNode,
    selectedNodeChildren: state.GoalCanvasInterfaceReducer.selectedNodeChildren,
    selectedNodeLabel: state.GoalCanvasInterfaceReducer.selectedNodeLabel,
    showTips: state.GoalCanvasInterfaceReducer.showTips
  }
}

export default withStyles(styles)(connect(mapStateToProps)(GoalCanvasInterface))
