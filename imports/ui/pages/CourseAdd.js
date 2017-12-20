import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {ContainerPage} from '../components/ContainerPage';
import {Redirect} from 'react-router-dom';

// import Course collection
import { Course } from '../../api/course/course.js';

import {WrappedFormCourse} from '../components/FormCourse.js';

// App component - represents the whole app
class CourseAdd extends Component {
  constructor (props) {
    super(props);

    this.state = {
      courseSubmit: false
    }

    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
  }

  handleSubmitCourse (values) {
    Meteor.call('course.insert', values, this.props.currentUser);

    this.setState({
      courseSubmit: true
    })
  }

  render () {
    const {currentUser} = this.props;
    const isAdmin = Roles.userIsInRole(currentUser, 'admin');

    if (!currentUser && !isAdmin) {
      return <Redirect to='/courses' />
    }

    return (
      <ContainerPage isAdmin={isAdmin}>
        {
          this.state.courseSubmit ?
          <Redirect to='/courses' />
          : ''
        }
        <WrappedFormCourse onSubmit={this.handleSubmitCourse}/>
      </ContainerPage>
    )
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.userId()
  };
})(CourseAdd);
