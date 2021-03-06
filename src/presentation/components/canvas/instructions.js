import React from 'react'

import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const instructions = [{
  header: 'Adding',
  details: [
    'double click the gray box to make an entry',
    'hover over an entry to find the teal dot, click and drag from the teal dot to another entry to connect them'
  ]
}, {
  header: 'Removing',
  details: [
    'click and hold a line to delete it',
    'click and hold entry to delete it'
  ]
}, {
  header: 'Editing',
  details: [
    'click an entry and start typing',
    'click an entry and scroll down'
  ]
}]

const GoaldInstructions = () => {
  let rendered = instructions.map((el, index) => {
    let grouping = el.details.map((el2, index2) => {
      return (
        <ListItem key={index2}>
          <ListItemText primary={el2} />
        </ListItem>
      )
    })
    return (
      <div className='col-md-4' key={index}>
        <List subheader={<ListSubheader>{el.header}</ListSubheader>}>
          {grouping}
        </List>
      </div>
    )
  })
  return (
    <div className='row'>
      {rendered}
    </div>
  )
}

export default GoaldInstructions
