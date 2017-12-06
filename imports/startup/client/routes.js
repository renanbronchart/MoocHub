import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// route components
import App from '../../ui/App.js';
import Course from '../../ui/pages/Course.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/courses" component={Course}/>
    </div>
  </Router>
);
