import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';

import AuthService from './common/auth-service.component.jsx'

import Main from './common/main.component.jsx'
import PageNotFound from './common/404.component.jsx'
import Home from './common/home.component.jsx'
import About from './common/about.component.jsx'

import GoalMap from './canvas/goal-map.component.jsx'

import User from './user/user.component.jsx'


const auth = new AuthService('eROFMLyWppPgvb10eR0O79rRmFF318bK', 'molla.auth0.com');
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}


render(
    <Router history={browserHistory}>
        <Route path="/" component={Main} auth={auth}>
            <Route path="login" component={Home} />
            <Route path="about" component={About}/>
            <Route path="user/" component={User} />
            <Route path="user/:id" component={User} onEnter={requireAuth} />
            <Route path="user/:id/map/:topic" component={GoalMap} onEnter={requireAuth} />
            <Route path="*" component={PageNotFound} />
        </Route>
    </Router>,
    document.getElementById('container')
);
