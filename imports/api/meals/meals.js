import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// imports for other models
import { Participants } from '../participants/participants.js';

class MealsCollection extends Mongo.Collection {
  insert(input, callback) {
    const realInput = input;
    realInput.createdAt = new Date();
    return super.insert(realInput, callback);
  }
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
  code: { type: String },
  createdAt: {
    type: Date,
    denyUpdate: true  // If you set denyUpdate: true, any collection update that modifies the field will fail.
  }
});

Meals.attachSchema(Meals.schema);

// This represents the keys that should be published
// to the client. If we add secret properties, don't list
// them here to keep them private to the server.
// Meals.publicFields = {
// };

Meals.helpers({
  participantsSorted() {
    console.log("participantsSorted");
    return Participants.find(
      { mealId: this._id },
      { sort: { name: 1 }}
    );
  }
});