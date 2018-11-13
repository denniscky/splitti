import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Participants } from './participants.js';

export const participantsInsert = new ValidatedMethod({
  name: 'participants.insert',
  validate: Participants.simpleSchema().pick([
    'name',
    'mealId'
  ]).validator(),
  run(input) {
    console.log('method input', input);
    return Participants.insert(input, null);
  }
});