const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  source: String,
  destination: String,
  email: String,
  cab: { type: Object },
  startTime: Date,
  endTime:Date,
  bookingPrice: Number,
  estimatedTime: Number,
  status: {
    type: String,
    enum: ['scheduled', 'In progress', 'archived'],
  }
  
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
