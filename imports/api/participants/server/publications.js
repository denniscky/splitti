/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Participants } from '../participants.js';

Meteor.publish('participants.all', function () {
  return Participants.find();
});