import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// import Course collection
import { Course } from '../../api/course/course.js';

// App component - represents the whole app
class CoursePage extends Component {
  constructor (props) {
    super(props);

  }

  render () {
    const {courseView} = this.props;

    return (
      <ContainerPage>
        {
          courseView &&
          <div>
            <h1>{courseView.title}</h1>
            <p>{courseView.description}</p>
          </div>
        }
      </ContainerPage>
    )
  }
}

export default withTracker(({match}) => {
  // subscribe to pulish to get one course with id's course
  Meteor.subscribe('course.getOne', match.params.course);

  const idCourse = match.params.course;
  const courseView = (Course.find(idCourse).fetch())[0];

  return {
    courseView,
  };
})(CoursePage);
