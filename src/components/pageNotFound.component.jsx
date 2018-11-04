import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class PageNotFound extends Component {
  render () {
    return (
      <div> Oh no! 404, go <NavLink to='/' activeClassName='active'>home</NavLink> </div>
    )
  }
}

export default PageNotFound
