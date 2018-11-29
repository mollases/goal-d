import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'

import Theme from './theme.js'

import AuthService from './services/auth-service.js'
import Config from './services/config.js'

import PageNotFound from './presentation/components/pageNotFound.js'
import About from './presentation/components/about.js'
import Callback from './presentation/components/callback.js'
import Welcome from './presentation/components/welcome.js'
import Main from './presentation/components/main.js'
import GoalMap from './presentation/components/goal-map.js'
import GoalMapDemo from './presentation/components/goal-map-demo.js'
import User from './presentation/containers/user.js'

import UserReducer from './reducers/user.js'
import GoalCanvasInterfaceReducer from './reducers/goal-canvas-interface.js'
import GoalNodeReducer from './reducers/goal-node.js'
import TimelineReducer from './reducers/timeline.js'

const auth = new AuthService('eROFMLyWppPgvb10eR0O79rRmFF318bK', 'molla.auth0.com', Config.getAuthCallback())
let reducers = combineReducers({ UserReducer, GoalCanvasInterfaceReducer, GoalNodeReducer, TimelineReducer })
let store = createStore(reducers)

const theme = createMuiTheme(Theme)

ReactDOM.render((
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main auth={auth} />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Welcome} auth={auth} />
              <Route path='/about' component={About} auth={auth} />
              <Route path='/demo' exact render={(props) => (
                <GoalMapDemo store={store} {...props} />
              )} />

              <Route path='/user/map/:topic' exact render={(props) => (
                !auth.isAuthenticated() ? <Redirect to='/' /> : <GoalMap user={auth.getActiveUser()} store={store} {...props} />
              )} />

              <Route path='/user' render={(props) => (
                !auth.isAuthenticated() ? <Redirect to='/' /> : <User user={auth.getActiveUser()} store={store} {...props} />
              )} />

              <Route path='/callback' component={(props) => {
                return <Callback {...props} auth={auth} />
              }} />
              <Route component={PageNotFound} auth={auth} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('app'))
