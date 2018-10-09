import './meals-show.html';

import { Meals } from '../../api/meals/meals.js';
import { MealItems } from '../../api/meal-items/meal-items.js';

Template.Meals_show.onCreated(function() {
  this.getMealId = () => FlowRouter.getParam('_id');
});

Template.Meals_show.helpers({
  participantId() {
    console.log(Session.get('participantId'));
    return Session.get('participantId');
  },

  mealCode() {
    const instance = Template.instance();
    let meal = Meals.findOne(instance.getMealId());
    console.log("mealCode", meal);
    return meal ? meal.code : '';
  },

  mealItems() {
    const instance = Template.instance();
    console.log("mealItems", MealItems.find({ mealId: instance.getMealId() }));
    return MealItems.find({ mealId: instance.getMealId() });
  },
});

Template.Meals_show.events({
  'click .btn-new-item'(event, instance) {
    console.log('click .btn-new-item - mealId', instance.getMealId());
    FlowRouter.go('MealItems.new', { _mealId: instance.getMealId() });
  },
});