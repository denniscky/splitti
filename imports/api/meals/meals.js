import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class MealsCollection extends Mongo.Collection {
}

export const Meals = new MealsCollection('meals');

// Deny all client-side updates since we will be using methods to manage this collection
Meals.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Meals.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String }
});

Meals.attachSchema(Meals.schema);