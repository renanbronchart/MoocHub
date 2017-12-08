import { Meteor } from 'meteor/meteor';

Meteor.publish('users.userList', () => {
  return Meteor.users.find({});
});
