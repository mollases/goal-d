import React, { Component } from 'react'
import autoBind from 'react-autobind'
import Responsive from 'react-responsive-decorator'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import Theme from '../../../theme.jsx'
import GoalDCytoscape from './goal-canvas-cytoscape.jsx'

const styles = theme => ({
  cy: {
    background: Theme.cy.background,
    height: '30%'
  }
})

class GoalCanvas extends Component {
  constructor (props) {
    super(props)
    this.cy = {}
    autoBind(this)
  }

  componentDidMount () {
    this.props.media({ minWidth: 768 }, () => {
      // desktop
      this.initializeCY()
    })
    this.props.media({ maxWidth: 768 }, () => {
      // mobile
      this.initializeCY(30)
    })
  }

  initializeCY (fontSize) {
    this.cy = GoalDCytoscape({
      unselected: Theme.cy.primary,
      selected: Theme.cy.secondary,
      handleColor: Theme.cy.context,
      element: this.props.id,
      userZoomingEnabled: !!this.props.userZoomingEnabled,
      fontSize
    })
    this.cy.add(this.props.map)
    let layout = this.cy.layout({ name: 'preset' })
    layout.run()
    this.cy.on('select', this.props.onSelect)
    this.cy.on('add', this.props.onAdd)
    this.cy.on('unselect', this.props.onUnselect)
    this.cy.ready(e => { if (this.props.onReady) { this.props.onReady(e, this.cy) } })
    this.cy.zoom(1)
    this.cy.center(this.cy.elements())
  }

  render () {
    return (
      <Paper
        className={this.props.classes.cy}
        id={this.props.id}
      />
    )
  }
}

export default Responsive(withStyles(styles)(GoalCanvas))
