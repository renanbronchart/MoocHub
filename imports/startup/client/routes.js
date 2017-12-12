import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Layout } from 'antd';

import { Navigation } from '../../ui/components/Navigation';

import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

// route components
import Registration from '../../ui/pages/Registration.js';
import Home from '../../ui/pages/Home.js';
import CoursePage from '../../ui/pages/CoursePage.js';
import CourseList from '../../ui/pages/CourseList.js';
import CourseAdd from '../../ui/pages/CourseAdd.js';

const browserHistory = createBrowserHistory();
const { Header, Footer, Sider, Content } = Layout;

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Sider className='navigation'><Navigation /></Sider>
      <Switch>
        <Route exact path="/login" component={Registration}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/courses" component={CourseList}/>
        <Route exact path="/courses/add" component={CourseAdd}/>
        <Route exact path="/course/:course" component={CoursePage}/>
        <Route component={Home}/>
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
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
