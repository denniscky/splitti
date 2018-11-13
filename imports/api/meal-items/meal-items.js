import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// imports for other models
import { Participants } from '../participants/participants.js';

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
  participantIds: {
    type: Array,
    minCount: 0
  },
  'participantIds.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
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
  mealId: 1,
  name: 1
};

MealItems.helpers({
  priceString() {
    return `$${this.price / 100}.00`;
  },

  isEveryoneSplitting() {
    return this.participantIds.length === 0;
  },

  participants() {
    let arr = [];
    this.participantIds.forEach((id) => {
      let p = Participants.findOne(id);
      if (p) {
        arr.push(p);
      }
    });
    return arr;
  }
});