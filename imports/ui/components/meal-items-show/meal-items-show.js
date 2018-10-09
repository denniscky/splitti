/* global confirm */

// Self
import './meal-items-show.html';

// Models
import { MealItems } from '../../../api/meal-items/meal-items.js';

// Components

Template.MealItems_show.onCreated(function() {
  this.autorun(() => {
    new SimpleSchema({
      mealItem: { type: MealItems._helpers }
    }).validate(Template.currentData());
  });
});

Template.MealItems_show.helpers({
  // price() {
  //
  //   return 1234;
  // }
});