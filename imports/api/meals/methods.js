import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Meals } from './meals.js';

export const mealsInsert = new ValidatedMethod({
  name: 'meals.insert',
  validate: Meals.simpleSchema().pick(['code']).validator(),
  run(input) {
    return Meals.insert(input, null);
  }
});