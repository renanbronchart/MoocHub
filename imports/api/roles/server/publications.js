import { Meteor } from 'meteor/meteor';

Meteor.publish('roles.userInRole', function (userId, role) {
  Roles.userIsInRole(userId, role);
});
