import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class MealItemsCollection extends Mongo.Collection {
  insert(input, callback) {
    const realInput = input;
    realInput.createdAt = new Date();
    return super.insert(realInput, callback);
  }
}

export const MealItems = new MealItemsCollection('meal-items');

// Deny all client-side updates since we will be using methods to manage this collection
MealItems.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

MealItems.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  mealId: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  price: { type: Number },
  createdAt: {
    type: Date,
    denyUpdate: true  // If you set denyUpdate: true, any collection update that modifies the field will fail.
  }
});

MealItems.attachSchema(MealItems.schema);

// This represents the keys that should be published
// to the client. If we add secret properties, don't list
// them here to keep them private to the server.
MealItems.publicFields = {
  name: 1
};