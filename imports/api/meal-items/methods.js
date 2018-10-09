import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { MealItems } from './meal-items.js';

export const mealItemsInsert = new ValidatedMethod({
  name: 'meal-items.insert',
  validate: MealItems.simpleSchema().pick(['name']).validator(),
  run(input) {
    return MealItems.insert(input, null);
  }
});