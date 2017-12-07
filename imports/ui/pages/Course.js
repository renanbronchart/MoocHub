import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Course } from '../../api/course/course.js';

// App component - represents the whole app
class CoursePage extends Component {
  renderCourses () {
    return this.props.allCourses.map((element) => (
      <li key={element._id}>
        <h3>{element.title}</h3>
        <h5>{element.description}</h5>
        <p>{element.content}</p>
      </li>
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Courses</h1>
        </header>
        <main>
          <ul>
            {this.renderCourses()}
          </ul>
        </main>
      </div>
    );
  }
}



export default withTracker(() => {
  Meteor.subscribe('course.all');

  return {
    allCourses: Course.find({}).fetch(),
  };
})(CoursePage);
