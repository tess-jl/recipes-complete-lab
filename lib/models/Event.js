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

// schema.virtual('month') 
//   .get(function() {
//     const diff = dateOfEvent 
//     return this.dateOfEvent.getMonth() - diff; 
//   }

// schema.virtual('day') 
//   .get(function() {
//     const diff = dateOfEvent 
//     return this.dateOfEvent.getDay() - diff; 
//   }


module.exports = mongoose.model('Event', schema);
