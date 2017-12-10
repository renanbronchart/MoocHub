import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// import component to login and sign up
import AccountsUIWrapper from './components/AccountsUiWrapper.js';

// App component - represents the whole app
class App extends Component {
  render() {
    return (
      <div className="container--fluid">
        <AccountsUIWrapper />
        <header>
          <h1>Mooc Hub</h1>
        </header>
        <main></main>
      </div>
    );
  }
}


export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);
