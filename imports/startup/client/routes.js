import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/home-index.js';
import '../../ui/pages/meals-show.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Home.index',
  action() {
    BlazeLayout.render('App_body', { main: 'Home_index' });
  },
});

FlowRouter.route('/meals/:_id', {
  name: 'Meals.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Meals_show' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
