import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { Meals } from './meals.js';

export const mealsInsert = new ValidatedMethod({
  name: 'meals.insert',
  validate: Meals.simpleSchema().validator(),
  run() {
    console.log("meals insert");
    return Meals.insert({});
  }
});
