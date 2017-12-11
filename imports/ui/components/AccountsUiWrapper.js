import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

import { FormSign } from './FormSign.js';

export default class AccountsUIWrapper extends Component {
  constructor (props) {
    super(props);

    this.state = {
      registration: true,
      redirectToReferrer: false,
      errorForm: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  handleSubmit (values) {
    const {email, password} = values;
    const {registration} = this.state;

    registration ? this.signUp(email, password) : this.signIn(email, password);
  }

  signIn (email, password) {
    Meteor.loginWithPassword(email, password, (err) => {
      if (!err) {
        this.setState({
          redirectToReferrer: true,
          errorForm: ''
        })
      } else {
        this.setState({
          errorForm: 'Erreur de mot de passe ou email'
        })
      }
    });
  }

  signUp (email, password) {
    Accounts.createUser({
      email,
      password
    });

    this.setState({
      registration: false,
      errorForm: ''
    })
  }

  changeView (e) {
    e.preventDefault();

    this.setState({
      registration: !this.state.registration,
      errorForm: ''
    })
  }

  render() {
    const {registration, redirectToReferrer, errorForm} = this.state;
    const { from } = { from: { pathname: '/courses' } }
    const currentUser = Meteor.userId();
    const labelSubmit = registration ? 'S\'inscrire' : 'Se connecter';

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className='container--fluid'>
        <div className='row'>
          <div className='col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3'>
            {
              !currentUser ?
              <FormSign changeView={this.changeView} registration={registration} errorForm={errorForm} onSubmit={this.handleSubmit} /> :
              <Redirect to='/' />
            }
          </div>
        </div>
      </div>
    )
  }
}
