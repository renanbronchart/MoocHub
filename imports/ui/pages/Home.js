import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Redirect} from 'react-router-dom';

import {ContainerPage} from '../components/ContainerPage';

// App component - represents the whole app
class App extends Component {
  render() {
    const currentUser = this.props.currentUser;

    if (!currentUser) {
      return <Redirect to='/login' />
    }

    return (
      <ContainerPage>
        <h1>Home</h1>
      </ContainerPage>
    );
  }
}


export default withTracker(() => {
  return {
    currentUser: Meteor.userId()
  };
})(App);
