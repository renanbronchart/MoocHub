import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import {Meteor} from 'meteor/meteor';

// route components
import App from '../../ui/App.js';
import CoursePage from '../../ui/pages/CoursePage.js';
import CourseList from '../../ui/pages/CourseList.js';

// navigation Component
import { Navigation } from '../../ui/components/Navigation';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={App}/>
        <PrivateRoute path="/courses" component={CourseList}/>
        <Route path="/course/:course" component={CoursePage}/>
        <Route component={App}/>
      </Switch>
    </div>
  </Router>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.user() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
