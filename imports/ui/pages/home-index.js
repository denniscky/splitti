import { FlowRouter } from 'meteor/kadira:flow-router';

import './home-index.html';

import { Meals } from '../../api/meals/meals.js';
import { mealsInsert } from '../../api/meals/methods.js';
import { Participants } from '../../api/participants/participants.js';
import { participantsInsert } from '../../api/participants/methods.js';

Template.Home_index.onCreated(function() {
  this.autorun(() => {
    let currentParticipant = Participants.findOne(Session.get('participantId'));
    console.log("Home_index.onCreated", currentParticipant);
    if (currentParticipant) {
      FlowRouter.go('Meals.show', { _id: currentParticipant.mealId });
    }
  });
  // this.state = new ReactiveDict();
  // this.state.setDefault({
  //   menuOpen: false,
  //   userMenuOpen: false,
  // });
});

Template.Home_index.helpers({
});

Template.Home_index.events({
  'click .btn-create-meal'(event, instance) {
    const mealId = mealsInsert.call({
      code: 'ABCD'
    }, (err) => {
      if (err) { console.log('err', err); }
    });
    console.log('click .btn-create-meal', mealId);
  },

  'click .btn-join-meal'(event, instance) {
    let targetMeal = Meals.findOne({ code: $('.input-meal-code').val().trim().toUpperCase() });
    if (targetMeal) {
      const participantId = participantsInsert.call({
        mealId: targetMeal._id,
        name: 'Dennis'
      }, (err) => {
        if (err) { console.log('err', err); }
      });

      console.log('click .btn-join-meal', targetMeal, participantId);
      localStorage.setItem('participantId', participantId);
      Session.set('participantId', localStorage.getItem('participantId'));
    }
    else {
      alert('This code is invalid');
    }
  }
});