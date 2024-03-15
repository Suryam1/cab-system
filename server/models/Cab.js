const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  name: String,
  price: Number,
  busyDuration: {
    type: Date,
    default: new Date(),
  },
});

const Cab = mongoose.model('Cab', cabSchema);

module.exports = Cab;
