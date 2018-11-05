import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { NavLink } from 'react-router-dom'
import Login from './login.component.jsx'

class Main extends Component {
  render () {
    var user = ''
    if (this.props.auth.isAuthenticated()) {
      user = (<NavLink to={'/user'} activeClassName='active'>
        <FlatButton label='user' />
      </NavLink>)
    }
    return (
      <AppBar
        title={
          <NavLink to='/'>Goal-d</NavLink>
        }
        showMenuIconButton={false}
        iconElementRight={
          <span>
            {user}
            <Login auth={this.props.auth} />
            <NavLink to='/about'>
              <FlatButton label='about' />
            </NavLink>
          </span>}
      />
    )
  }
}

export default Main
