import React, { Component } from 'react'
import { Link } from 'react-router'

class PageNotFound extends Component {
  render () {
    return (
      <div> Oh no! 404, go <Link to='/' activeClassName='active'>home</Link> </div>
    )
  }
}

export default PageNotFound
