import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import {Redirect} from 'react-router-dom';

export default class AccountsUIWrapper extends Component {
  constructor (props) {
    super(props);

    this.state = {
      registration: true,
      redirectToReferrer: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();

    const {email, password} = e.target;
    const {registration} = this.state;

    const emailValue = email.value;
    const passwordValue = password.value;

    registration ? this.signUp(emailValue, passwordValue) : this.signIn(emailValue, passwordValue);
  }

  signIn (emailValue, passwordValue) {
    Meteor.loginWithPassword(emailValue, passwordValue, (err) => {
      if (!err) {
        this.setState({
          redirectToReferrer: true
        })
      } else {

      }
    });
  }

  signUp (emailValue, passwordValue) {
    Accounts.createUser({
      email: emailValue,
      password: passwordValue
    });

    this.setState({
      registration: false
    })
  }

  logout (e) {
    e.preventDefault();

    Meteor.logout();
  }

  render() {
    const {registration, redirectToReferrer} = this.state;
    const { from } = { from: { pathname: '/courses' } }
    const currentUser = Meteor.user();
    const labelSubmit = registration ? 'S\'inscrire' : 'Se connecter';

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        {
          // registration ?
          currentUser ?
          <p><a href="#" className="logout" onClick={this.logout}>Logout</a></p> :
          <form onSubmit={this.handleSubmit}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="submit" value={labelSubmit} />
          </form>
        }
      </div>
    )
  }
}
