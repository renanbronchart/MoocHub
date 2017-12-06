// Methods related to course

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Course } from './course.js';

Meteor.methods({
  'course.insert'(title, description, content, owner) {
    check(title, String);
    check(description, String);
    check(content, String);
    check(owner, Number);

    return Links.insert({
      title,
      description,
      content,
      owner,
      createdAt: new Date(),
    });
  },
});
