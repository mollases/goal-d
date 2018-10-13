import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'

const instructions = [{
  header: 'Adding',
  details: [
    'double click above to make an entry',
    'hover over an entry to find the red dot, click and drag from the red dot to another entry to connect them'
  ]
}, {
  header: 'Removing',
  details: [
    'right click a line to delete it',
    'right click an entry to delete it'
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
    let rendered = instructions.map((el, index) => {
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
    return (
      <div className='row'>
        {rendered}
      </div>
    )
  }
}

export default GoaldInstructions
