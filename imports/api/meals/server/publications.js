/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Meals } from '../meals.js';

Meteor.publish('meals.public', function mealsPublic() {
  return Meals.find({
    userId: { $exists: false },
  }, {
    fields: Meals.publicFields,
  });
});

Meteor.publish('meals.private', function mealsPrivate() {
  // if (!this.userId) {
  //   return this.ready();
  // }

  // return Meals.find({
  //   userId: this.userId,
  // }, {
  //   fields: Meals.publicFields,
  // });
  return Meals.find({
    userId: { $exists: false },
  }, {
    fields: Meals.publicFields,
  });
});
