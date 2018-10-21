import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import Save from 'material-ui/svg-icons/content/save'
import ActionList from 'material-ui/svg-icons/action/list'
// import Toggle from 'material-ui/Toggle'

import GoalDCytoscape from './goal-canvas-cytoscape.jsx'
import GoalDInstructions from './goal-canvas-instructions.component.jsx'
import Config from '../../services/config.service.jsx'

const iconStyles = {
  marginRight: 24
}

class GoalCanvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showTips: false,
      nodeGrouping: false,
      map: {},
      nodeLabel: '',
      node: {}
    }
    this.cy = {}
    this.layout = {}
    this.onNodeSelected = this.onNodeSelected.bind(this)
    this.onNodeLabelChange = this.onNodeLabelChange.bind(this)
    this.postMap = this.postMap.bind(this)
    this.toggleTips = this.toggleTips.bind(this)
    // this.toggleGroupingChange = this.toggleGroupingChange.bind(this)
  }

  componentDidMount () {
    Config.getUserTopic(this.props.auth.getActiveUser(), this.props.topicId)
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
        this.cy = GoalDCytoscape(this.state.map)
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
        Config.getUserDetails(this.props.auth.getActiveUser())
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
    Config.postUserTopic(this.props.auth.getActiveUser(), this.props.topicId, body)
  }

  componentWillUnmount () {
    this.postMap()
  }

  onNodeSelected (node) {
    var children = this.cy.edges('[source = "' + node.data().id + '"]').targets()
    this.props.onNodeSelected(node, children)
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
    let toggle = !this.state.showTips
    this.setState({ showTips: toggle })
  }

  render () {
    return (
      <div>
        <div className='row'>
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
        <div className='row'>
          <div
            className='col-md-4'
            id='cy'
          />
        </div>
        <div className='row'>
          <Save style={iconStyles} onClick={this.postMap} /> <ActionList style={iconStyles} onClick={this.toggleTips} />
        </div>
        <div className='row'>
          {this.state.showTips ? <GoalDInstructions /> : ''}
        </div>
      </div>
    )
  }
}

export default GoalCanvas
