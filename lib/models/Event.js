const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  notes: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

schema.virtual('year') 
  .get(function() {
    return this.dateOfEvent.getFullYear();
  })
  .set(function(yearToSet) {
    this.dateOfEvent.setFullYear(yearToSet);
  }); 

schema.virtual('month') 
  .get(function() {
    return this.dateOfEvent.getMonth();
  })
  .set(function(monthToSet) {
    this.dateOfEvent.setMonth(monthToSet);
  }); 

schema.virtual('day') 
  .get(function() {
    return this.dateOfEvent.getDate();
  })
  .set(function(dayToSet) {
    this.dateOfEvent.setDate(dayToSet);
  }); 



module.exports = mongoose.model('Event', schema);
