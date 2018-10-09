import './meals-show.html';

Template.Meals_show.onCreated(function() {
  this.getMealId = () => FlowRouter.getParam('_id');
});

Template.Meals_show.helpers({
  participantId() {
    console.log(Session.get('participantId'));
    return Session.get('participantId');
  }
});

Template.Meals_show.events({
  'click .btn-new-item'(event, instance) {
    const instance2 = Template.instance();
    console.log('click .btn-new-item - mealId', instance2.getMealId());
    FlowRouter.go('MealItems.new', { _mealId: instance2.getMealId() });
  },
});