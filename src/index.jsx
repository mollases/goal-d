import React from 'react'
import { render } from 'react-dom'
// Import routing components
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import AuthService from './Services/auth-service.component.jsx'

import Main from './Common/main.component.jsx'
import PageNotFound from './Common/404.component.jsx'
import About from './Common/about.component.jsx'
import Callback from './Common/callback.component.jsx'
import Welcome from './welcome.component.jsx'

import GoalMap from './canvas/goal-map.component.jsx'

import User from './User/user.component.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const auth = new AuthService('eROFMLyWppPgvb10eR0O79rRmFF318bK', 'molla.auth0.com')
const requireAuth = (nextState, replace) => {
  if (!auth.isAuthenticated()) {
    replace({ pathname: '/' })
  }
}

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path='/' component={Main} auth={auth}>
        <IndexRoute component={Welcome} />
        <Route path='about' component={About} />
        <Route path='user' component={(props) => <User auth={auth} {...props} />} onEnter={requireAuth} />
        <Route path='user/map/:topic' component={(props) => <GoalMap auth={auth} {...props} />} onEnter={requireAuth} />
        <Route path='callback' component={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }} />
        <Route path='*' component={PageNotFound} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('app')
)
