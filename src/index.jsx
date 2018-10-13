import React from 'react'
import { render } from 'react-dom'
// Import routing components
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AuthService from './services/auth-service.component.jsx'

import Main from './components/main.component.jsx'
import PageNotFound from './components/404.component.jsx'
import About from './components/about.component.jsx'
import Callback from './components/callback.component.jsx'
import Welcome from './welcome.component.jsx'
import GoalMap from './components/canvas/goal-map.component.jsx'
import User from './components/user/user.component.jsx'

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
