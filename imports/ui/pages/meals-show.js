import './meals-show.html';

// imports for models
import { Meals } from '../../api/meals/meals.js';
import { MealItems } from '../../api/meal-items/meal-items.js';

// Components
import '../components/meal-items-show/meal-items-show.js';

Template.Meals_show.onCreated(function() {
  this.getMealId = () => FlowRouter.getParam('_id');

  this.getMeal = () => {
    return Meals.findOne(this.getMealId());
  };
});

Template.Meals_show.helpers({
  meal() {
    const instance = Template.instance();
    return instance.getMeal();
  },

  mealItems() {
    const instance = Template.instance();
    console.log("mealItems", MealItems.find({ mealId: instance.getMealId() }));
    return MealItems.find({ mealId: instance.getMealId() });
  },

  mealItemArgs(mealItem) {
    return {
      mealItem
    };
  }
});

Template.Meals_show.events({
  'click .btn-new-item'(event, instance) {
    console.log('click .btn-new-item - mealId', instance.getMealId());
    FlowRouter.go('MealItems.new', { _mealId: instance.getMealId() });
  },
});