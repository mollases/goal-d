import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'

const instructions = [{
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

class GoaldInstructions extends Component {
  render () {
    return instructions.map((el, index) => {
      let grouping = el.details.map((el2, index2) => {
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

export default GoaldInstructions
