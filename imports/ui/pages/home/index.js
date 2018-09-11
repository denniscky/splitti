// import { $ } from 'meteor/jquery';

import './index.html';

import { mealsInsert } from '../../../api/meals/methods.js';

Template.Home_index.helpers({
  // counter() {
  //   return Template.instance().counter.get();
  // },
});

// Template.Home_index.events({
//   'click .btn-create-meal'(event, instance) {
//     console.log('click me!');
//     const mealId = mealsInsert.call({
//       code: "ABCD"
//     }, (err) => {
//       if (err) { console.log("err", err); }
//     });
//
//     console.log(mealId);
//   },
//
//   'click .btn-join-meal'(event, instance) {
//     console.log('click me!', $('.meal-code-input').val());
//
//
//     // const participantId = participantsInsert.call({
//     //   name: "ABCD"
//     // }, (err) => {
//     //   if (err) { console.log("err", err); }
//     // });
//     //
//     // console.log(mealId);
//   }
// });

Template.Home_index.onCreated(function appBodyOnCreated() {
  this.subscribe('meals.all');
  this.subscribe('participants.all');

  // this.state = new ReactiveDict();
  // this.state.setDefault({
  //   menuOpen: false,
  //   userMenuOpen: false,
  // });
});