/* global confirm */
import './meal-items-show.html';

// imports for models
import { MealItems } from '../../../api/meal-items/meal-items.js';

Template.MealItems_show.onCreated(function() {
  this.autorun(() => {
    new SimpleSchema({
      mealItem: { type: MealItems._helpers }
    }).validate(Template.currentData());
  });
});

Template.MealItems_show.helpers({
  participantsToNames(participants) {
    return participants.map((p) => {
      return p.name;
    }).join(', ');
  },
});

Template.MealItems_show.events({
  'click .btn-edit-meal-item'(event, instance) {
    console.log('click .btn-create-meal-item', instance.data.mealItem);
    FlowRouter.go('MealItems.edit', { _mealItemId: instance.data.mealItem._id });
  }
});
