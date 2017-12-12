// Methods related to course

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Course } from './course.js';

Meteor.methods({
  'course.insert'(values, ownerId) {
    const {title, description, content} = values;
    const ownerUsername = Meteor.users.find({ _id: ownerId}).fetch()[0].emails[0].address;

    check(title, String);
    check(description, String);
    check(content, String);
    check(ownerId, String);

    Course.insert({
      title,
      description,
      content,
      owner: ownerId,
      ownerUsername,
      createdAt: new Date(),
    });
  },

  'course.remove'(id) {
    check(id, String);

    Course.remove({
      '_id': id
    })
  },

  'course.update'(id, values) {
    const {title, description, content} = values;

    check(title, String);
    check(description, String);
    check(content, String);
    check(id, String);

    Course.updateOne({
      _id: id
    },
    {
      $set: {
        title,
        description,
        content,
      },
      $currentDate: {
        lastModified: true
      }
    }
    )
  },
});
