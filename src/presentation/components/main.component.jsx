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
  text: {
    color: 'white'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const ToolbarLink = withStyles(styles)(({ classes, label }) => (
  <NavLink to={'/' + label} activeClassName='active'>
    <Button className={classes.text}>{label}</Button>
  </NavLink>
))

const Main = ({ auth, classes }) => (
  <div className={classes.root}>
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h4' color='inherit' className={classes.grow}>
          <NavLink to='/' className={classes.text} activeClassName={classes.text}>
            Goal-D
          </NavLink>
        </Typography>
        { auth.isAuthenticated() ? <ToolbarLink label='user' /> : <ToolbarLink label='demo' />}
        <Login auth={auth} textClass={classes.text} />
        <ToolbarLink label='about' />
      </Toolbar>
    </AppBar>
  </div>
)

export default withStyles(styles)(Main)
