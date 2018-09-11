/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Meals } from '../meals.js';

Meteor.publish('meals.all', function () {
  return Meals.find();
});