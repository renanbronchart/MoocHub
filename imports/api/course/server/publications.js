// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Course } from '../course.js';

Meteor.publish('course.all', function () {
  return Course.find();
});

Meteor.publish('course.getOne', function (courseId) {
  return Course.find(courseId);
});
