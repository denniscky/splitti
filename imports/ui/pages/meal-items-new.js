import './meal-items-new.html';
import {mealItemsInsert} from "../../api/meal-items/methods";

// imports for models
import { Meals } from '../../api/meals/meals.js';
import { MealItems } from "../../api/meal-items/meal-items";

Template.MealItems_new.onCreated(function() {
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

Template.MealItems_new.onRendered(function() {
  $('#input-meal-item-name').focus();
});

Template.MealItems_new.helpers({
  meal() {
    const instance = Template.instance();
    return instance.getMeal();
  },

  isParticipantMe(participant) {
    return participant._id === Session.get('participantId');
  }
});

Template.MealItems_new.events({
  'click .btn-create-meal-item'(event, instance) {
    console.log('click .btn-create-meal-item', instance.generateParticipantIds());
    let mealId = instance.getMealId();
    const mealItemId = mealItemsInsert.call({
      mealId: mealId,
      name: $('#input-meal-item-name').val().trim(),
      participantIds: instance.generateParticipantIds(),
      price: parseFloat($('#input-meal-item-price').val().trim()).toFixed(2) * 100
    }, (err) => {
      if (err) {
        console.log('err', err);
        return;
      }
      FlowRouter.go('Meals.show', { _id: mealId });
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