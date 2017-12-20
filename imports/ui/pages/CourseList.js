import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Checkbox } from 'antd';

import { Course } from '../../api/course/course.js';


import {WrappedFormCourse} from '../components/FormCourse.js';
import { CourseElement } from '../components/CourseElement.js';
import {ContainerPage} from '../components/ContainerPage.js';

import TableList from '../components/TableList.js';

// App component - represents the whole app
class CourseList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      allCourses: null,
      viewMyCourse: false
    }

    this.toggleViewMyCourse = this.toggleViewMyCourse.bind(this);
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
  }

  renderCourses () {
    if (this.props.currentUser) {
      if (this.state.viewMyCourse) {
        let coursesFilterd = this.props.allCourses.filter((course) => {
          return course.owner == this.props.currentUser
        });

        return coursesFilterd.map((element) => (
          <CourseElement
            elem={element}
            key={element._id}
            user={this.props.user}
            onClick={() => this.handleDeleteCourse(element._id)}
          />
        ))
      } else {
        return (
          <TableList
            allCourses={this.props.allCourses}
            onClick={this.handleDeleteCourse}
            user={this.props.user}
          />
        )
      }
    } else {
      return <p>We must you connect</p>
    }
  }

  toggleViewMyCourse (e) {
    this.setState({
      viewMyCourse: !this.state.viewMyCourse
    })
  }

  handleDeleteCourse (id) {
    Meteor.call('course.remove', id);
  }

  render() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    const user = this.props.user;

    if (!this.props.currentUser) {
      return <Redirect to='/login' />
    }

    return (
      <ContainerPage isAdmin={isAdmin}>
        <header>
          <h1>Courses</h1>
        </header>
        <main>
          {user && user.emails[0].address}
          {user && isAdmin ? <p>Professeur</p> : <p>Éleve</p>}
          <ul>
            {this.renderCourses()}
          </ul>
          {user && isAdmin ? <Checkbox onChange={this.toggleViewMyCourse}>Voir mes cours</Checkbox> : ''}
        </main>
      </ContainerPage>
    );
  }
}



export default withTracker(() => {
  Meteor.subscribe('course.all');

  return {
    allCourses: Course.find({}).fetch(),
    currentUser: Meteor.userId(),
    user: Meteor.user()
  };
})(CourseList);
