import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// import Switch from '@material-ui/core/Switch'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

const EmptyList = () => (
  <ListItem>
    <ListItemText primary='Select a node with children to see its children here' />
  </ListItem>
)

const PopulatedList = (nodes) => (
  nodes.nodes.map((el, i) => (
    <div key={i}>
      <ListItem>
        <ListItemText primary={el.label} />
        {/* <ListItemSecondaryAction>
          <Switch
            onChange={}
            checked={}
          />
        </ListItemSecondaryAction> */}
      </ListItem>
      {
        i === nodes.nodes.length - 1
          ? null
          : <Divider />
      }
    </div>
  ))
)

const ChildrenNodes = ({ label, childNodes, classes }) => (
  <Paper className={classes.root} elevation={1}>
    <List subheader={<ListSubheader>{label}</ListSubheader>}>
      {
        childNodes && childNodes.length
          ? <PopulatedList nodes={childNodes} />
          : <EmptyList />
      }
    </List>
  </Paper>
)

export default withStyles(styles)(ChildrenNodes)
