import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import App from '../../ui/App.js';
import CoursePage from '../../ui/pages/Course.js';

// navigation Component
import { Navigation } from '../../ui/components/Navigation';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/courses" component={CoursePage}/>
        <Route component={App}/>
      </Switch>
    </div>
  </Router>
);
