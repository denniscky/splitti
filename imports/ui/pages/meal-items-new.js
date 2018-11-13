import './meal-items-new.html';
import {mealItemsInsert} from "../../api/meal-items/methods";

// imports for models
import { Participants } from '../../api/participants/participants.js';

Template.MealItems_new.onCreated(function() {
  this.getMealId = () => FlowRouter.getParam('_mealId');

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
  isParticipantMe(participant) {
    return participant._id === Session.get('participantId');
  },

  allParticipantsSorted() {
    const instance = Template.instance();
    return Participants.find(
      { mealId: instance.getMealId() },
      { sort: { name: 1 }}
    );
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