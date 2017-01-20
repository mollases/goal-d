import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from './common/main.component.jsx'
import PageNotFound from './common/404.component.jsx'
import Home from './common/home.component.jsx'
import About from './common/about.component.jsx'

import GoalMap from './canvas/goal-map.component.jsx'

import User from './user/user.component.jsx'

render(
    <Router history={browserHistory}>
        <Route component={Main}>
            <Route path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/user/:id" component={User} magic={Main.val}/>
            <Route path="/user/:id/map" component={GoalMap}/>
            <Route path="/*" component={PageNotFound} />
        </Route>
    </Router>,
    document.getElementById('container')
);
