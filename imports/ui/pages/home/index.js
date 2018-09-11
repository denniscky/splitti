import { Meals } from '../../../api/meals/meals.js';
import { mealsInsert } from '../../../api/meals/methods.js';

import './index.html';

// import '../../components/hello/hello.js';
// import '../../components/info/info.js';

Template.Home_index.helpers({
  // counter() {
  //   return Template.instance().counter.get();
  // },
});

Template.Home_index.events({
  'click .btn-create-meal'(event, instance) {
    console.log('click me!');
    // Meals.insert({}, null);
    // mealsInsert.call({}, (err) => {
    //   if (err) {
    //     console.log("err", err);
    //   }

    //   console.log("finito");
    // });


    const listId = mealsInsert.call((err) => {
      if (err) {
        console.log("err", err);
      }
    });

    // Meteor.call('mealsInsert', (error) => {
    //   if (error) {
    //     alert(error.error);
    //   }
    // });
  },
});

Template.Home_index.onCreated(function appBodyOnCreated() {
  console.log("subscribing");
  this.subscribe('meals.public');
  this.subscribe('meals.private');

  // this.state = new ReactiveDict();
  // this.state.setDefault({
  //   menuOpen: false,
  //   userMenuOpen: false,
  // });
});