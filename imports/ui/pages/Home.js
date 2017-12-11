import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Redirect} from 'react-router-dom';

// App component - represents the whole app
class App extends Component {
  render() {
    return (
      <div className="container--fluid">
        {
          this.props.currentUser ?
          <h1>Home</h1>
          :
          <Redirect to='/login' />
        }
      </div>
    );
  }
}


export default withTracker(() => {
  return {
    currentUser: Meteor.userId()
  };
})(App);
