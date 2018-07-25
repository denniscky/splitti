import './index.html';
import {
  mealsInsert
} from '../../../api/meals/methods.js';


import { Meals } from '../../../api/meals/meals.js';

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
    Meals.insert({}, null);
    // mealsInsert.call({}, (err) => {
    //   if (err) {
    //     console.log("err", err);
    //   }

    //   console.log("finito");
    // });
  },
});


