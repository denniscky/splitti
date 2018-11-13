import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { MealItems } from './meal-items.js';

export const mealItemsInsert = new ValidatedMethod({
  name: 'meal-items.insert',
  validate: MealItems.simpleSchema().pick([
    'mealId',
    'name',
    'participantIds',
    'participantIds.$',
    'price'
  ]).validator(),
  run(input) {
    return MealItems.insert(input, null);
  }
});

export const mealItemsUpdate = new ValidatedMethod({
  name: 'todos.makeChecked',
  validate: new SimpleSchema({
    mealItemId: MealItems.simpleSchema().schema('_id'),
    name: MealItems.simpleSchema().schema('name'),
    participantIds: MealItems.simpleSchema().schema('participantIds'),
    'participantIds.$': MealItems.simpleSchema().schema('participantIds.$'),
    price: MealItems.simpleSchema().schema('price')
  }).validator(),
  run({ mealItemId, name, participantIds, price }) {
    console.log('method', name, participantIds, price);
    MealItems.update(mealItemId, {
      $set: {
        name: name,
        participantIds: participantIds,
        price: price
      }
    });
  },
});