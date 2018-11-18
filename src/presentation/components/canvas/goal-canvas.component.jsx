import React, { Component } from 'react'
import autoBind from 'react-autobind'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import Theme from './../../../theme.jsx'
import GoalDCytoscape from './goal-canvas-cytoscape.jsx'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  cy: {
    background: Theme.cy.background,
    height: '30%'
  },
  card: {
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  }
})

class GoalCanvas extends Component {
  constructor (props) {
    super(props)
    this.cy = {}
    autoBind(this)
  }

  componentDidMount () {
    this.cy = GoalDCytoscape({
      unselected: Theme.cy.primary,
      selected: Theme.cy.secondary,
      handleColor: Theme.cy.context,
      element: this.props.id
    })
    this.cy.add(this.props.map)
    let layout = this.cy.layout({ name: 'preset' })
    layout.run()
  }

  render () {
    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
            <Typography variant='h5'>
              {this.props.label}
            </Typography>
            <Paper
              className={this.props.classes.cy}
              id={this.props.id}
            />
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(GoalCanvas)
