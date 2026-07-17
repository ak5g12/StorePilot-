const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
    default: 'StorePilot',
  },
  currency: {
    type: String,
    required: true,
    default: 'INR',
  },
  logo: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
