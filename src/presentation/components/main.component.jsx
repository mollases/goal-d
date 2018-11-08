import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { NavLink } from 'react-router-dom'
import Login from './login.component.jsx'

const UserLink = () => (
  <NavLink to={'/user'} activeClassName='active'>
    <FlatButton label='user' />
  </NavLink>
)

const Main = ({ auth }) => (
  <AppBar
    title={<NavLink to='/'>Goal-d</NavLink>}
    showMenuIconButton={false}
    iconElementRight={
      <span>
        {auth.isAuthenticated() ? <UserLink /> : null }
        <Login auth={auth} />
        <NavLink to='/about'>
          <FlatButton label='about' />
        </NavLink>
      </span>}
  />
)

export default Main
