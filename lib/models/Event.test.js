const mongoose = require('mongoose');
const Event = require('./Event');
const Recipe = require('./Recipe');

describe('Event model', () => {

  let cookieEvent;
  let cookieRecipe;
  beforeEach(() => {
    cookieRecipe = new Recipe ({
      name: 'cookies',
      ingredients: [
        { name: 'flour', amount: 1, measurement: 'cup' }
      ],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
    cookieEvent = new Event({
      recipeId: cookieRecipe._id,
      dateOfEvent: new Date('2014-12-12T00:00:00'),
      notes: 'It went well',
      rating: 4
    });
  });

  it('has a required recipeId', () => {
    const event = new Event();
    const { errors } = event.validateSync();

    expect(errors.recipeId.message).toEqual('Path `recipeId` is required.');
  });

  describe('tests for dateOfEvent', () => {
    it('has a required dateOfEvent', () => {
      const event = new Event();
      const { errors } = event.validateSync();
  
      expect(errors.dateOfEvent.message).toEqual('Path `dateOfEvent` is required.');
    });
    it('has a year get virtual', () => {
      expect(cookieEvent.year).toEqual(2014);
    });
    it('has a year set virtual', () => {
      cookieEvent.year = 2015;
      expect(cookieEvent.year).toEqual(2015);
    });
    it('has a month get virtual', () => {
      expect(cookieEvent.month).toEqual(11);
    });
  });


  it('has a required rating', () => {
    const event = new Event();
    const { errors } = event.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('has a rating 0 or above', () => {
    const event = new Event({
      rating: -1
    });
    const { errors } = event.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (-1) is less than minimum allowed value (0).');
  });

  it('has a rating 5 or below', () => {
    const event = new Event({
      rating: 6
    });
    const { errors } = event.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });
});
