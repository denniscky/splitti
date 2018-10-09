/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { MealItems } from '../meal-items.js';

Meteor.publish('meal-items.all', function () {
  return MealItems.find();
});