import React, { Component } from 'react'
import autoBind from 'react-autobind'

import TextField from 'material-ui/TextField'
import Save from 'material-ui/svg-icons/content/save'
import ActionList from 'material-ui/svg-icons/action/list'
// import Toggle from 'material-ui/Toggle'

import GoalDCytoscape from './goal-canvas-cytoscape.jsx'
import GoalDInstructions from './goal-canvas-instructions.component.jsx'
import Config from '../../../services/config.service.jsx'
import { toggleInstructions, nodeSelected, getTopicLabel, getTopicMap } from './../../../actions/goal-canvas.actions.jsx'

const iconStyles = {
  marginRight: 24
}

class GoalCanvas extends Component {
  constructor (props) {
    super(props)
    this.cy = {}
    autoBind(this)
  }

  getState () {
    return this.props.store.getState().GoalCanvasReducer
  }

  componentDidMount () {
    this.props.store.subscribe(this.forceUpdate.bind(this))
    getTopicMap(this.props.topicId, this.props.userId, Config, this.props.store.dispatch)
      .then(() => {
        const stateProps = this.getState()
        this.cy = GoalDCytoscape()
        this.cy.add(stateProps.map)
        let layout = this.cy.layout({ name: 'preset' })
        layout.run()
        this.cy.on('select', (e) => {
          this.onNodeSelected(e.target)
        })
        this.cy.on('unselect', (e) => {
          this.onNodeSelected()
        })
      })
      .then(() => {
        let stateProps = this.getState()
        if (stateProps.label && stateProps.label !== '') {
          return
        }
        getTopicLabel(this.props.topicId, this.props.userId, Config, this.props.store.dispatch)
      })
  }

  postMap () {
    const stateProps = this.getState()
    let body = {
      label: stateProps.label,
      map: this.cy.elements().jsons()
    }
    this.setState({ map: body.map })
    Config.postUserTopic(this.props.userId, this.props.topicId, body)
  }

  componentWillUnmount () {
    this.postMap()
  }

  onNodeSelected (node) {
    if (node) {
      var children = this.cy.edges('[source = "' + node.data().id + '"]').targets()
      this.props.store.dispatch(nodeSelected(node, node.data().label, children))
    } else {
      this.props.store.dispatch(nodeSelected({}, '', []))
    }
  }

  onNodeLabelChange (event, extra, useData) {
    var val = ''
    const stateProps = this.getState()
    if (event !== undefined) {
      val = event.target && event.target.value
      if (useData) {
        val = stateProps.selectedNode.data().label
      }
      stateProps.selectedNode.data('label', val)
    }

    this.props.store.dispatch(nodeSelected(stateProps.selectedNode, val, stateProps.selectedNodeChildren))
  }

  toggleTips () {
    this.props.store.dispatch(toggleInstructions())
  }

  render () {
    const stateProps = this.getState()
    return (
      <div>
        <div className='row col-md-12'>
          <h3 className='col-md-4'>{stateProps.label}</h3>
          <TextField
            className='col-md-4'
            floatingLabelText='graph!'
            value={stateProps.selectedNodeLabel}
            onChange={this.onNodeLabelChange}
          />
        </div>
        <div className='row col-md-12'>
          <div
            className='col-md-4'
            id='cy'
          />
        </div>
        <div className='row col-md-12'>
          <Save style={iconStyles} onClick={this.postMap} /> <ActionList style={iconStyles} onClick={this.toggleTips} />
        </div>
        <div className='row col-md-12'>
          {stateProps.showTips ? <GoalDInstructions /> : ''}
        </div>
      </div>
    )
  }
}

export default GoalCanvas
