import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import GoalCanvas from './goal-canvas.js'

const styles = theme => ({
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
      <div className={this.props.classes.details}>
        <CardContent className={this.props.classes.content}>
          <Typography variant='h5'>
            {this.props.label}
          </Typography>
          <GoalCanvas
            id={this.props.id}
            map={this.props.map}
          />
        </CardContent>
      </div>
    )
  }
}

export default withStyles(styles)(GoalCanvasExample)
