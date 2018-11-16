import React, { Component } from 'react'
import autoBind from 'react-autobind'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class ChildrenNodes extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  render () {
    return (
      <Paper className={styles.root} elevation={1}>
        <List subheader={<ListSubheader>{this.props.label}</ListSubheader>}>
          {this.renderChildren()}
        </List>
      </Paper>
    )
  }

  renderChildren () {
    if (this.props.childNodes && this.props.childNodes.length) {
      return this.props.childNodes.map((el, i) => {
        return (
          <div>
            <ListItem key={el.key}>
              <ListItemText primary={el.label} />
              <ListItemSecondaryAction>
                <Switch
                  // onChange={this.handleToggle('wifi')}
                  // checked={this.state.checked.indexOf('wifi') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            {
              i === this.props.childNodes.length - 1
                ? null
                : <Divider />
            }
          </div>
        )
      })
    }
    return (
      <ListItem>
        <ListItemText primary='Select a node with children to see its children here' />
      </ListItem>
    )
  }
}

export default ChildrenNodes
