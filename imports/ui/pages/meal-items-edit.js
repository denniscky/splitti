import './meal-items-edit.html';
import { mealItemsUpdate } from "../../api/meal-items/methods";

// imports for models
import { Meals } from '../../api/meals/meals.js';
import { MealItems } from '../../api/meal-items/meal-items.js';

Template.MealItems_edit.onCreated(function() {
  this.getMealItemId = () => FlowRouter.getParam('_mealItemId');
  this.getMealId = () => FlowRouter.getParam('_mealId');

  this.getMeal = () => {
    return Meals.findOne(this.getMealId());
  };

  this.getMealItem = () => {
    return MealItems.findOne(this.getMealItemId());
  };

  this.generateParticipantIds = () => {
    if ($('.check-everyone').prop('checked')) {
      return [];
    }
    let arr = [];
    $('.check-individual:checked').each(function() {
      arr.push($(this).val());
    });
    return arr;
  }
});

Template.MealItems_edit.helpers({
  mealItem() {
    const instance = Template.instance();
    return instance.getMealItem();
  },

  meal() {
    const instance = Template.instance();
    return instance.getMeal();
  },

  isParticipantMe(participant) {
    return participant._id === Session.get('participantId');
  },

  isParticipantIncluded(participant) {
    const instance = Template.instance();
    return instance.getMealItem().participantIds.indexOf(participant._id) !== -1;
  }
});

Template.MealItems_edit.events({
  'click .btn-save-meal-item'(event, instance) {
    console.log('click .btn-save-meal-item', instance.generateParticipantIds());
    let mealItemId = instance.getMealItemId();
    let newName = $('#input-meal-item-name').val().trim();
    mealItemsUpdate.call({
        mealItemId: mealItemId,
        name: newName,
        participantIds: instance.generateParticipantIds(),
        price: parseFloat($('#input-meal-item-price').val().trim()).toFixed(2) * 100
      },
      (err) => {
        if (err) {
          console.log('err', err);
          return;
        }
        FlowRouter.go('Meals.show', { _id: instance.getMealId() });
      });
  },

  'click .btn-cancel'(event, instance) {
    window.history.back();
  },

  'click .check-individual'(event, instance) {
    $('.check-everyone').prop('checked', false);
  },

  'click .check-everyone'(event, instance) {
    $('.check-individual').prop('checked', false);
  }
});