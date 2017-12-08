import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Course } from '../../api/course/course.js';


import {WrappedFormCourse} from '../components/FormCourse.js';

// App component - represents the whole app
class CourseList extends Component {
  constructor (props) {
    super(props);

    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
  }

  renderCourses () {
    if (this.props.currentUser) {
      return this.props.allCourses.map((element) => (
        <li key={element._id}>
          <h3><strong>Titre : </strong>{element.title}</h3>
          <h5><strong>description : </strong>{element.description}</h5>
          <p><strong>contenu : </strong>{element.content}</p>
          <p><strong>Professeur : </strong>{element.ownerUsername}</p>
        </li>
      ));
    } else {
      return <p>We must you connect</p>
    }
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
          {user && isAdmin ? <p>Professeur</p> : <p>Éleve</p>}
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
    currentUser: Meteor.user()
  };
})(CourseList);
