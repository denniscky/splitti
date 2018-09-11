import './app-body.html';

Meteor.startup(() => {
  Session.set('participantId', localStorage.getItem('participantId'));
});

Template.App_body.onCreated(function() {
  this.subscribe('meals.all');
  this.subscribe('participants.all');
});
