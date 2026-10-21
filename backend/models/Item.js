const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);