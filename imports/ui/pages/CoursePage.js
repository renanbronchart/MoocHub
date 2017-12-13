import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {ContainerPage} from '../components/ContainerPage';
import {Redirect} from 'react-router-dom';

import { Checkbox } from 'antd';

// import Course collection
import { Course } from '../../api/course/course.js';

import {FormUpdate} from '../components/FormUpdate';

// App component - represents the whole app
class CoursePage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      updateMode: false,
      courseSubmit: false,
    }

    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
  }

  toggleViewMode (e) {
    this.setState({
      updateMode: !this.state.updateMode
    })
  }

  handleSubmitCourse (values) {
    Meteor.call('course.update', this.props.idCourse, values);

    this.setState({
      courseSubmit: true
    })
  }

  render () {
    const {courseView, currentUser} = this.props;
    const isAdmin = Roles.userIsInRole(currentUser, 'admin');
    const {updateMode, courseSubmit} = this.state;

    if (!currentUser) {
      return <Redirect to='/login' />
    }

    if (courseSubmit) {
      return <Redirect to='/courses' />
    }

    return (
      <ContainerPage>
        {
          courseView &&
          <div>
            {
              updateMode ?
              <FormUpdate data={courseView} onSubmit={this.handleSubmitCourse}/>
              :
              <div>
                <h1>{courseView.title}</h1>
                <h4>{courseView.description}</h4>
                <p>{courseView.content}</p>
              </div>
            }
            {courseView.owner === currentUser ? <Checkbox onChange={this.toggleViewMode}>Mode edition</Checkbox> : ''}
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
  const currentUser = Meteor.userId();

  return {
    courseView,
    currentUser,
    idCourse,
  };
})(CoursePage);
