const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  timeInMinutes: {
    type: Number,
    required: true,
  },
});

const Path = mongoose.model('Path', pathSchema);

module.exports = Path;
