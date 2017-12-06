// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Course } from '../../api/course/course.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Course.find().count() === 0) {
    const data = [
      {
        title: 'Vue Js',
        description: 'Course on SPA Vue.js',
        content: 'Bla Blu plip plop Bla Blu plip plop Bla Blu plip plop Bla Blu plip plop',
        owner: 1
      }
    ];

    data.forEach(doc => Course.insert(doc));
  }
});
