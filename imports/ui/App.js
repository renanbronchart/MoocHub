import React, { Component } from 'react';

// import component to login and sign up
import AccountsUIWrapper from './components/AccountsUiWrapper.js';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <AccountsUIWrapper />
        <header>
          <h1>Mooc Hub</h1>
        </header>
        <main></main>
      </div>
    );
  }
}
