import React, { Component } from 'react'
import uuid from 'uuid'

import cytoscape from 'cytoscape'
import coseBilkent from 'cytoscape-cose-bilkent'
import edgehandles from 'cytoscape-edgehandles'
import cxtmenu from 'cytoscape-cxtmenu'

import Config from '../Services/config.service.jsx'

import TextField from 'material-ui/TextField'
import { List, ListItem } from 'material-ui/List'
import Save from 'material-ui/svg-icons/content/save'
import ActionList from 'material-ui/svg-icons/action/list'

import Toggle from 'material-ui/Toggle'

coseBilkent(cytoscape)
edgehandles(cytoscape)

cxtmenu(cytoscape)

const config = new Config()
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
    this.renderTips = this.renderTips.bind(this)
    this.postMap = this.postMap.bind(this)
    this.toggleTips = this.toggleTips.bind(this)
    this.toggleGroupingChange = this.toggleGroupingChange.bind(this)
    this.instructions = [{
      header: 'Adding',
      details: [
        'double click above to make an entry',
        'double click an entry to make a new entry connected to the first entry',
        'click a entry, shift click another entry to connect the two with a line'
      ]
    }, {
      header: 'Removing',
      details: [
        'right click a line to delete it',
        'right click an entry to delete it',
        'click an entry, shift + backspace to delete it'
      ]
    }, {
      header: 'Editing',
      details: [
        'click an entry and start typing',
        'click an entry and scroll down'
      ]
    }]
  }

  componentDidMount () {
    let that = this

    const edgeHandleDefaults = {
      preview: true, // whether to show added edges preview before releasing selection
      stackOrder: 4, // Controls stack order of edgehandles canvas element by setting it's z-index
      handleSize: 4, // the size of the edge handle put on nodes
      handleHitThreshold: 6, // a threshold for hit detection that makes it easier to grab the handle
      handleIcon: false, // an image to put on the handle
      handleColor: '#ff0000', // the colour of the handle and the line drawn from it
      handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
      handleLineWidth: 2, // width of handle line in pixels
      handleOutlineColor: '#000000', // the colour of the handle outline
      handleOutlineWidth: 0, // the width of the handle outline in pixels
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      handlePosition: 'middle top', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      hoverDelay: 150, // time spend over a target node before it is considered a target selection
      cxt: false, // whether cxt events trigger edgehandles (useful on touch)
      enabled: true, // whether to start the plugin in the enabled state
      toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
      edgeType: function (sourceNode, targetNode) {
        // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
        // returning null/undefined means an edge can't be added between the two nodes
        return 'flat'
      },
      loopAllowed: function (node) {
        // for the specified node, return whether edges from itself to itself are allowed
        return false
      },
      nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      nodeParams: function (sourceNode, targetNode) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for intermediary node
        return {}
      },
      edgeParams: function (sourceNode, targetNode, i) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        // NB: i indicates edge index in case of edgeType: 'node'
        return {}
      },
      start: function (sourceNode) {
        // fired when edgehandles interaction starts (drag on handle)
      },
      complete: function (sourceNode, targetNodes, addedEntities) {
        if (that.state.nodeGrouping) {
          targetNodes.move({ parent: sourceNode.data().id })
          addedEntities.remove()
        }
      },
      stop: function (sourceNode) {
        // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      },
      cancel: function (sourceNode, renderedPosition, invalidTarget) {
        // fired when edgehandles are cancelled ( incomplete - nothing has been added ) - renderedPosition is where the edgehandle was released, invalidTarget is
        // a collection on which the handle was released, but which for other reasons (loopAllowed | edgeType) is an invalid target
      }
    }

    // the default values of each option are outlined below:
    var cxtmenuDefaults = {
      menuRadius: 100, // the radius of the circular menu in pixels
      selector: 'node, edge', // elements matching this Cytoscape.js selector will trigger cxtmenus
      commands: function (ele) {
        var cmds = [{
          content: 'delete',
          select: function (ele) {
            ele.remove()
          }
        }]
        if (ele.isEdge()) {
          cmds.push({
            content: 'dashed',
            select: function (ele) {
              ele.style({ 'line-style': 'dashed' })
            }
          }, {
            content: 'solid',
            select: function (ele) {
              ele.style({ 'line-style': 'solid' })
            }
          }, {
            content: 'dotted',
            select: function (ele) {
              ele.style({ 'line-style': 'dotted' })
            }
          })
        } else if (ele.isParent()) {
          cmds.push({
            content: 'free children',
            select: function (ele) {
              ele.children().move({ parent: null })
            }
          })
        }
        return cmds
      }, // function( ele ){ return [ /*...*/ ] }, // example function for commands
      fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
      activeFillColor: 'rgba(92, 194, 237, 0.75)', // the colour used to indicate the selected command
      activePadding: 20, // additional size in pixels for the active command
      indicatorSize: 24, // the size in pixels of the pointer to the active command
      separatorWidth: 3, // the empty spacing in pixels between successive commands
      spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
      minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
      maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
      openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: 'white', // the colour of text in the command's content
      itemTextShadowColor: 'black', // the text shadow colour of the command's content
      zIndex: 9999, // the z-index of the ui div
      atMouse: false // draw menu at mouse position
    }

    config.getUserTopic(this.props.auth.getActiveUser(), this.props.topicId)
      .then(function (response) {
        response.json().then(function (jsn) {
          if (jsn) {
            that.setState({
              label: jsn.label,
              map: jsn.map
            })
          }
        })
          .catch(function () {
            return ''
          })
          .then(function () {
            // var js = that.cy.json()
            // js.elements = that.state.map
            // that.cy.json(js)
            that.cy = cytoscape({
              container: document.getElementById('cy'),
              elements: that.state.map,
              layout: { name: 'preset' },
              style: cytoscape.stylesheet()
                .selector('node')
                .css({
                  'background-color': '#B3767E',
                  'width': 'mapData(baz, 0, 10, 10, 40)',
                  'height': 'mapData(baz, 0, 10, 10, 40)',
                  'content': 'data(label)'
                })
                .selector('edge')
                .css({
                  'content': 'data(label)',
                  'curve-style': 'bezier',
                  'width': 2,
                  'target-arrow-shape': 'triangle',
                  'opacity': 0.5
                })
                .selector(':selected')
                .css({
                  'background-color': 'black',
                  'line-color': 'black',
                  'target-arrow-color': 'black',
                  'source-arrow-color': 'black',
                  'opacity': 1
                })
                .selector(':parent')
                .css({
                  'background-opacity': 0.333
                })
                .selector('.faded')
                .css({
                  'opacity': 0.25,
                  'text-opacity': 0
                })
            })

            that.cy.edgehandles(edgeHandleDefaults)
            that.cy.cxtmenu(cxtmenuDefaults)
            that.cy.on('select', function (e) {
              that.setState({ node: e.target, nodeLabel: e.target.data().label })
              that.onNodeLabelChange(e.target.data(), '', true)
              that.onNodeSelected(e.target)
            })
            that.cy.on('unselect', function (e) {
              e.target.unselect()
              that.setState({ node: {}, nodeLabel: '' })
              that.onNodeLabelChange()
            })

            var tappedBefore
            var tappedTimeout

            that.cy.on('tap', function (event) {
              var tappedNow = event.target
              if (tappedTimeout && tappedBefore) {
                clearTimeout(tappedTimeout)
              }
              if (tappedBefore === tappedNow) {
                tappedNow.trigger('doubleTap', event.position)
                tappedBefore = null
              } else {
                tappedTimeout = setTimeout(function () { tappedBefore = null }, 300)
                tappedBefore = tappedNow
              }
            })

            that.cy.on('doubleTap', function (event, pos) {
              that.cy.add({ data: { label: '', id: uuid() }, position: pos })
            })
            // that.layout = that.cy.layout({name: 'cose-bilkent'})
            // that.layout.run()
          })
          .then(function (label) {
            if (label && label !== '') {
              return
            }
            config.getUserDetails(that.props.auth.getActiveUser()).then(function (r) {
              r.json().then(function (jsn) {
                let label = jsn.topics.filter(function (el) {
                  if (el.id === parseInt(that.props.topicId)) {
                    return el
                  }
                })[0].label
                that.setState({ label: label })
              })
            })
          })
      })
  }

  postMap () {
    let body = {
      label: this.state.label,
      map: this.cy.elements().jsons()
    }
    this.setState({ map: body.map })
    config.postUserTopic(this.props.auth.getActiveUser(), this.props.topicId, body)
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

  toggleGroupingChange () {
    let toggle = !this.state.nodeGrouping
    this.setState({ nodeGrouping: toggle })
  }

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
          <Toggle
            label='grouping'
            labelPosition='right'
            onToggle={this.toggleGroupingChange}
          />
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
          {this.renderTips(this.state.showTips)}
        </div>
      </div>
    )
  }

  renderTips (show) {
    if (show) {
      return this.instructions.map(function (el, index) {
        let grouping = el.details.map(function (el2, index2) {
          return (
            <ListItem primaryText={el2} key={index2} />
          )
        })
        return (
          <div className='col-md-4' key={index}>
            <h4 className='text-center'>{el.header}</h4>
            <List>
              {grouping}
            </List>
          </div>
        )
      })
    }
  }
}

export default GoalCanvas
