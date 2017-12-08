import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Course } from '../../api/course/course.js';

// App component - represents the whole app
const CoursePage = ({match}) => (
  <div>
    <h1>Page course</h1>
    <p>{match.params.user}</p>
  </div>
)



export default withTracker(() => {

  return {
  };
})(CoursePage);
