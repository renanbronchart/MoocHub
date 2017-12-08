// Methods related to course

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Course } from './course.js';

Meteor.methods({
  'course.insert'(values, ownerId) {
    const {title, description, content, owner = 1} = values;

    check(title, String);
    check(description, String);
    check(content, String);
    check(ownerId, String);

    Course.insert({
      title,
      description,
      content,
      owner: ownerId,
      createdAt: new Date(),
    });
  },
});
