import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const handleLogout = (e) => {
  e.preventDefault();

  Meteor.logout();
}

export const Logout = () =>
  <Link to="/courses" onClick={handleLogout}>Se déconnecter</Link>
