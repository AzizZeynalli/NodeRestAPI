const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A venue must have a name'],
  },
  location: {
    type: String,
    required: [true, 'A venue must have a location'],
  },
  capacity: {
    type: Number,
    required: [true, 'A venue must have a capacity'],
  },
  description: {
    type: String,
    required: [true, 'A venue must have a description'],
  },
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
