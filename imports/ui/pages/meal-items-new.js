import './meal-items-new.html';
import {mealItemsInsert} from "../../api/meal-items/methods";

Template.MealItems_new.onCreated(function() {
  this.getMealId = () => FlowRouter.getParam('_mealId');
});

Template.MealItems_new.helpers({
});

Template.MealItems_new.events({
  'click .btn-create-meal-item'(event, instance) {
    console.log('click .btn-create-meal-item', Session.get('participantId'));
    let mealId = instance.getMealId();
    const mealItemId = mealItemsInsert.call({
      mealId: mealId,
      name: $('.input-meal-item-name').val().trim(),
      participantIds: [ Session.get('participantId') ],
      price: parseFloat($('.input-meal-item-price').val().trim()).toFixed(2) * 100
    }, (err) => {
      if (err) {
        console.log('err', err);
        return;
      }
      FlowRouter.go('Meals.show', { _id: mealId });
    });
    console.log('click .btn-create-meal-item', mealItemId);
  },
});