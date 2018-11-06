import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => (
  <div> Oh no! 404, go <NavLink to='/' activeClassName='active'>home</NavLink> </div>
)

export default PageNotFound
