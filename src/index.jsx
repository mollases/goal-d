import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'

import Theme from './theme.jsx'

import AuthService from './services/auth-service.component.jsx'
import Config from './services/config.service.jsx'

import PageNotFound from './presentation/components/pageNotFound.component.jsx'
import About from './presentation/components/about.component.jsx'
import Callback from './presentation/components/callback.component.jsx'
import Welcome from './presentation/components/welcome.component.jsx'
import Main from './presentation/components/main.component.jsx'
import GoalMap from './presentation/containers/goal-map.component.jsx'
import User from './presentation/containers/user.component.jsx'

import UserReducer from './reducers/user.reducer.jsx'
import GoalCanvasReducer from './reducers/goal-canvas.reducer.jsx'
import GoalNodeReducer from './reducers/goal-node.reducer.jsx'
import TimelineReducer from './reducers/timeline.reducer.jsx'

const auth = new AuthService('eROFMLyWppPgvb10eR0O79rRmFF318bK', 'molla.auth0.com', Config.getAuthCallback())
let reducers = combineReducers({ UserReducer, GoalCanvasReducer, GoalNodeReducer, TimelineReducer })
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

              <Route path='/user/map/:topic' exact render={(props) => (
                !auth.isAuthenticated() ? <Redirect to='/' /> : <GoalMap auth={auth} store={store} {...props} />
              )} />

              <Route path='/user' render={(props) => (
                !auth.isAuthenticated() ? <Redirect to='/' /> : <User auth={auth} store={store} {...props} />
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
