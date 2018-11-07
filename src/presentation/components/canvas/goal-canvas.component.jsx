import React, { Component } from 'react'
import autoBind from 'react-autobind'

import TextField from 'material-ui/TextField'
import Save from 'material-ui/svg-icons/content/save'
import ActionList from 'material-ui/svg-icons/action/list'
// import Toggle from 'material-ui/Toggle'

import GoalDCytoscape from './goal-canvas-cytoscape.jsx'
import GoalDInstructions from './goal-canvas-instructions.component.jsx'
import Config from '../../../services/config.service.jsx'
import { toggleInstructions, nodeSelected } from './../../../actions/goal-canvas.actions.jsx'

const iconStyles = {
  marginRight: 24
}

class GoalCanvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nodeGrouping: false,
      map: {},
      nodeLabel: '',
      node: {}
    }
    this.cy = {}
    this.layout = {}
    autoBind(this)
  }

  getState () {
    return this.props.store.getState().GoalCanvasReducer
  }

  componentDidMount () {
    this.props.store.subscribe(this.forceUpdate.bind(this))
    Config.getUserTopic(this.props.userId, this.props.topicId)
      .then((response) => response.json())
      .then((jsn) => {
        if (jsn) {
          this.setState({
            label: jsn.label,
            map: jsn.map
          })
        }
      })
      .catch(() => {}) // dont error out
      .then(() => {
        this.cy = GoalDCytoscape()
        this.cy.add(this.state.map)
        let layout = this.cy.layout({ name: 'preset' })
        layout.run()
        this.cy.on('select', (e) => {
          this.setState({ node: e.target, nodeLabel: e.target.data().label })
          this.onNodeLabelChange(e.target.data(), '', true)
          this.onNodeSelected(e.target)
        })
        this.cy.on('unselect', (e) => {
          e.target.unselect()
          this.setState({ node: {}, nodeLabel: '' })
          this.onNodeLabelChange()
        })
      })
      .then(() => {
        if (this.state.label && this.state.label !== '') {
          return
        }
        Config.getUserDetails(this.props.userId)
          .then((r) => r.json())
          .then((jsn) => {
            let label = jsn.topics.filter((el) => {
              if (el.id === parseInt(this.props.topicId)) {
                return el
              }
            })[0].label
            this.setState({ label: label })
          })
      })
  }

  postMap () {
    let body = {
      label: this.state.label,
      map: this.cy.elements().jsons()
    }
    this.setState({ map: body.map })
    Config.postUserTopic(this.props.userId, this.props.topicId, body)
  }

  componentWillUnmount () {
    this.postMap()
  }

  onNodeSelected (node) {
    var children = this.cy.edges('[source = "' + node.data().id + '"]').targets()
    this.props.store.dispatch(nodeSelected(node, children))
  }

  onNodeLabelChange (event, extra, useData) {
    var val = ''
    if (event !== undefined) {
      val = event.target && event.target.value
      if (useData) {
        val = this.state.node.data().label
      }
      this.state.node.data('label', val)
    }
    this.setState({ nodeLabel: val })
  }

  // toggleGroupingChange () {
  //   let toggle = !this.state.nodeGrouping
  //   this.setState({ nodeGrouping: toggle })
  // }

  toggleTips () {
    this.props.store.dispatch(toggleInstructions())
  }

  render () {
    const stateProps = this.getState()
    return (
      <div>
        <div className='row col-md-12'>
          <h3 className='col-md-4'>{this.state.label}</h3>
          <TextField
            className='col-md-4'
            floatingLabelText='graph!'
            value={this.state.nodeLabel}
            onChange={this.onNodeLabelChange}
          />
          {/* <Toggle
            label='grouping'
            labelPosition='right'
            onToggle={this.toggleGroupingChange}
          /> */}
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
