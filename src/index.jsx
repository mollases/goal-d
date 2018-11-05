import React from 'react'
// Import routing components
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AuthService from './services/auth-service.component.jsx'

import PageNotFound from './components/pageNotFound.component.jsx'
import About from './components/about.component.jsx'
import Callback from './components/callback.component.jsx'
import Welcome from './components/welcome.component.jsx'
import GoalMap from './containers/goal-map.component.jsx'
import User from './containers/user.component.jsx'
import Main from './components/main.component.jsx'
const auth = new AuthService('eROFMLyWppPgvb10eR0O79rRmFF318bK', 'molla.auth0.com')

const requireAuth = (nextState, replace) => {
  if (!auth.isAuthenticated()) {
    replace({ pathname: '/' })
  }
}

ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
      <div>
        <Main auth={auth} />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Welcome} auth={auth} />
            <Route path='/about' component={About} auth={auth} />
            <Route path='/user/map/:topic' exact component={(props) => <GoalMap auth={auth} {...props} />} onEnter={requireAuth} />
            <Route path='/user' component={(props) => <User auth={auth} {...props} />} onEnter={requireAuth} />
            <Route path='/callback' component={(props) => {
              return <Callback {...props} auth={auth} />
            }} />
            <Route component={PageNotFound} auth={auth} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('app'))
