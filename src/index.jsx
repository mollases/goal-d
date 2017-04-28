import React, { Component } from 'react';
import { render } from 'react-dom';
import process from 'process';
// Import routing components
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';

import AuthService from './Services/auth-service.component.jsx'

import Main from './Common/main.component.jsx'
import PageNotFound from './Common/404.component.jsx'
import Home from './Common/home.component.jsx'
import About from './Common/about.component.jsx'

import GoalMap from './canvas/goal-map.component.jsx'

import User from './User/user.component.jsx'


const auth = new AuthService(process.env.AUTH0_KEY, 'molla.auth0.com');
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
