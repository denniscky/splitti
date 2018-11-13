/* global confirm */

// Self
import './meal-items-show.html';

// Models
import { MealItems } from '../../../api/meal-items/meal-items.js';
import {Participants} from "../../../api/participants/participants";

// Components

Template.MealItems_show.onCreated(function() {
  this.autorun(() => {
    new SimpleSchema({
      mealItem: { type: MealItems._helpers }
    }).validate(Template.currentData());
  });
});

Template.MealItems_show.helpers({
  participantIdsToNames(participantIds) {
    if (!participantIds) {}
    return participantIds.map((id) => {
      console.log(id, Participants.findOne(id));
      return Participants.findOne(id).name;
    }).join(',');
  }
});