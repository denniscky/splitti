import './meals-show.html';

Template.Meals_show.helpers({
  participantId() {
    console.log(Session.get('participantId'));
    return Session.get('participantId');
  }
});

Template.Meals_show.events({
});

Template.Meals_show.onCreated(function appBodyOnCreated() {
});