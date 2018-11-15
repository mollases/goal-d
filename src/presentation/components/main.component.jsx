import React from 'react'
import AppBar from 'material-ui/AppBar'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import Login from './login.component.jsx'

const UserLink = () => (
  <NavLink to={'/user'} activeClassName='active'>
    <Button> User</Button>
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
          <Button>About</Button>
        </NavLink>
      </span>}
  />
)

export default Main
