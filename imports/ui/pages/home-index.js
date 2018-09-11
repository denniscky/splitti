// import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './home-index.html';

import { Meals } from '../../api/meals/meals.js';
import { mealsInsert } from '../../api/meals/methods.js';
import { Participants } from '../../api/participants/participants.js';
import { participantsInsert } from '../../api/participants/methods.js';

Template.Home_index.helpers({
});

Template.Home_index.events({
  'click .btn-create-meal'(event, instance) {
    console.log('click me!');
    const mealId = mealsInsert.call({
      code: 'ABCD'
    }, (err) => {
      if (err) { console.log('err', err); }
    });

    console.log(mealId);
  },

  'click .btn-join-meal'(event, instance) {

    let targetMeal = Meals.findOne({ code: $('.meal-code-input').val().trim().toUpperCase() });
    console.log(targetMeal);
    if (targetMeal) {
      const participantId = participantsInsert.call({
        mealId: targetMeal._id,
        name: 'Dennis'
      }, (err) => {
        if (err) { console.log('err', err); }
      });

      console.log(participantId);
      localStorage.setItem('participantId', participantId);
      Session.set('participantId', localStorage.getItem('participantId'));


    }
    else {
      alert('This code is invalid');
    }
  }
});

Template.Home_index.onCreated(function() {
  this.autorun(() => {
    let myself = Participants.findOne(Session.get('participantId'));
    console.log("home index", myself);
    if (myself) {
      FlowRouter.go('Meals.show', { _id: myself.mealId });
    }
  });
  // this.state = new ReactiveDict();
  // this.state.setDefault({
  //   menuOpen: false,
  //   userMenuOpen: false,
  // });
});