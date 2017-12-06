// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Course } from '../course.js';

Meteor.publish('course.all', function () {
  return Course.find();
});
