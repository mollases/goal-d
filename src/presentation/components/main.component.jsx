import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Login from './login.component.jsx'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const UserLink = () => (
  <NavLink to={'/user'} activeClassName='active'>
    <Button>User</Button>
  </NavLink>
)

const Main = ({ auth, classes }) => (
  <div className={classes.root}>
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h4' color='inherit' className={classes.grow}>
          Goal-D
        </Typography>
        { auth.isAuthenticated() ? <UserLink /> : null }
        <Login auth={auth} />
        <NavLink to='/about'>
          <Button>About</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  </div>
)

export default withStyles(styles)(Main)
