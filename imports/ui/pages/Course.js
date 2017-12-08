import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Course } from '../../api/course/course.js';


import {WrappedFormCourse} from '../components/FormCourse.js';

// App component - represents the whole app
class CoursePage extends Component {
  constructor (props) {
    super(props);

    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
  }

  renderCourses () {
    return this.props.allCourses.map((element) => (
      <li key={element._id}>
        <h3>{element.title}</h3>
        <h5>{element.description}</h5>
        <p>{element.content}</p>
      </li>
    ));
  }

  handleSubmitCourse (values) {
    Meteor.call('course.insert', values, Meteor.userId());
  }

  render() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    const user = Meteor.user()

    return (
      <div className="container">
        <header>
          <h1>Courses</h1>
        </header>
        <main>
          {user && user.emails[0].address}
          {user && isAdmin ? <p>Yes Admin</p> : <p>No admin</p>}
          <ul>
            {this.renderCourses()}
          </ul>
        </main>
        {user && isAdmin ? <WrappedFormCourse onSubmit={this.handleSubmitCourse}/> : ''}
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
