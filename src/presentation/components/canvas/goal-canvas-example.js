import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import GoalCanvas from './goal-canvas.js'

const styles = theme => ({
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

class GoalCanvasExample extends Component {
  render () {
    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
            <Typography variant='h5'>
              {this.props.label}
            </Typography>
            <GoalCanvas
              id={this.props.id}
              map={this.props.map}
            />
            <Paper
            />
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(GoalCanvasExample)
