import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class MealsCollection extends Mongo.Collection {
  insert(input, callback) {
    // const actualInput = input;
    // actualInput.name = "ABCD";
    // console.log("before super", actualInput); 
    console.log("simple insert");
    return super.insert({ name: "ABC" }, callback);
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
  name: { type: String }
});

Meals.attachSchema(Meals.schema);

// This represents the keys that should be published
// to the client. If we add secret properties, don't list
// them here to keep them private to the server.
Meals.publicFields = {
  name: 1
};