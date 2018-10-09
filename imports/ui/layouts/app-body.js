import './app-body.html';

Meteor.startup(() => {
  console.log('Meteor.startup', localStorage.getItem('participantId'));
  Session.set('participantId', localStorage.getItem('participantId'));
});

Template.App_body.onCreated(function() {
  this.subscribe('meals.all');
  this.subscribe('meal-items.all');
  this.subscribe('participants.all');
});
