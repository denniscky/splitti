import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// includes of other models
// [none]

class ParticipantsCollection extends Mongo.Collection {
  insert(input, callback) {
    const realInput = input;
    realInput.createdAt = new Date();
    return super.insert(realInput, callback);
  }
}

export const Participants = new ParticipantsCollection('participants');

// Deny all client-side updates since we will be using methods to manage this collection
Participants.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Participants.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  mealId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true  // If you set denyUpdate: true, any collection update that modifies the field will fail.
  },
  createdAt: {
    type: Date,
    denyUpdate: true  // If you set denyUpdate: true, any collection update that modifies the field will fail.
  }
});

Participants.attachSchema(Participants.schema);

// This represents the keys that should be published
// to the client. If we add secret properties, don't list
// them here to keep them private to the server.
Participants.publicFields = {
  name: 1
};