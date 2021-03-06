import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import uuid from 'uuid'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Save from '@material-ui/icons/Save'
import Snackbar from '@material-ui/core/Snackbar'
import Help from '@material-ui/icons/Help'

import Theme from '../../../theme.js'
import GoalDCytoscape from './cytoscape.js'
import GoalDInstructions from './instructions.js'
import { toggleInstructions, nodeSelected, getTopicLabel, postTopicMap, getTopicMap, closeSaveDialog } from '../../../actions/goal-canvas-interface.js'

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
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
})

class GoalCanvasInterface extends Component {
  constructor (props) {
    super(props)
    this.cy = {}
    autoBind(this)
  }

  componentDidMount () {
    let promise = Promise.resolve()
    if (!this.props.demo) {
      promise = getTopicMap(this.props.topicId, this.props.userId, this.props.store.dispatch)
    }
    promise
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
        this.cy.zoom(1)
        this.cy.center(this.cy.elements())
        if (this.props.label && this.props.label !== '') {
          return
        }
        let promise = Promise.resolve()
        if (!this.props.demo) {
          promise = getTopicLabel(this.props.topicId, this.props.userId, this.props.store.dispatch)
        }
        promise
          .then(() => {
            if (!this.cy.elements().size()) {
              let { width, height } = this.cy.size()
              width /= 2
              height /= 2
              let pos = { x: width, y: height }
              this.cy.add({ data: { label: this.props.label, id: uuid() }, position: pos })
            }
            this.cy.center(this.cy.elements())
          })
      })
  }

  postMap () {
    let body = {
      label: this.props.label,
      map: this.cy.elements().jsons()
    }
    if (!this.props.demo) {
      postTopicMap(this.props.topicId, this.props.userId, body, this.props.store.dispatch)
    }
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
      let height = node.position().y
      let width = node.position().x
      this.props.store.dispatch(nodeSelected(node, node.data('label'), children, height, width))
    } else {
      this.props.store.dispatch(nodeSelected({}, '', []))
    }
  }

  handleClose () {
    this.props.store.dispatch(closeSaveDialog())
  };

  onNodeLabelChange (event) {
    var val = ''
    if (event !== undefined) {
      val = event.target && event.target.value
      this.props.selectedNode.data('label', val)
    }

    this.onNodeSelected(this.props.selectedNode)
  }

  toggleTips () {
    this.props.store.dispatch(toggleInstructions())
  }

  render () {
    return (
      <Grid container>
        <Grid container>
          <Grid item xs={12} md={4}>
            <h3 className={this.props.classes.header} >{this.props.label}</h3>
          </Grid>
          <Grid item xs={12}>
            {this.props.showTips ? <GoalDInstructions /> : ''}
          </Grid>
          <Grid item xs={12}>
            <Paper
              className={this.props.classes.cy}
              id='cy'
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              className={this.props.classes.textField}
              value={this.props.selectedNodeLabel}
              onChange={this.onNodeLabelChange}
              id='nodeLabeler' // needed for autofocus
              margin='normal'
              label='add a label'
              variant='outlined'
              // style={this.props.style}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <div className={this.props.classes.iconParent}>
              {this.props.demo ? null : <Save onClick={this.postMap} className={this.props.classes.icon} />}
              <Help onClick={this.toggleTips} className={this.props.classes.icon} />
            </div>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.props.showSnackBar}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>saved!</span>}
        />
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  let { map, label, selectedNode, selectedNodeChildren, selectedNodeLabel, showTips, showSnackBar, height, width } = state.GoalCanvasInterfaceReducer
  return {
    map,
    label,
    selectedNode,
    selectedNodeChildren,
    selectedNodeLabel,
    showTips,
    showSnackBar,

    // TODO: idk what to do about this.... it looks gross when enabled
    style: {
      top: height,
      left: width,
      position: 'absolute'
      // display: (height || width) ? 'block' : 'none'
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps)(GoalCanvasInterface))
