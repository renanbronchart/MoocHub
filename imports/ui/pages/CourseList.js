import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Checkbox } from 'antd';

import { Course } from '../../api/course/course.js';


import {WrappedFormCourse} from '../components/FormCourse.js';

// App component - represents the whole app
class CourseList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      allCourses: null,
      viewMyCourse: false
    }

    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
    this.toggleViewMyCourse = this.toggleViewMyCourse.bind(this);
  }

  renderCourses () {
    if (this.props.currentUser) {
      if (this.state.viewMyCourse) {
        let coursesFilterd = this.props.allCourses.filter((course) => {
          return course.owner == this.props.currentUser._id
        });

        return coursesFilterd.map((element) => (
          <li key={element._id}>
            <h3><strong>Titre : </strong>{element.title}</h3>
            <h5><strong>description : </strong>{element.description}</h5>
            <p><strong>contenu : </strong>{element.content}</p>
            <p><strong>Professeur : </strong>{element.ownerUsername}</p>
            <Link to={`/course/${element._id}`}>Aller voir le cours</Link>
          </li>
        ))
      } else {
        return this.props.allCourses.map((element) => (
          <li key={element._id}>
            <h3><strong>Titre : </strong>{element.title}</h3>
            <h5><strong>description : </strong>{element.description}</h5>
            <p><strong>contenu : </strong>{element.content}</p>
            <p><strong>Professeur : </strong>{element.ownerUsername}</p>
            <Link to={`/course/${element._id}`}>Aller voir le cours</Link>
          </li>
        ));
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

  handleSubmitCourse (values) {
    Meteor.call('course.insert', values, Meteor.userId());
  }

  render() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    const user = Meteor.user();

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
          {user && isAdmin ? <Checkbox onChange={this.toggleViewMyCourse}>Voir mes cours</Checkbox> : ''}
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
