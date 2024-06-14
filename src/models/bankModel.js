const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  ifsc: { type: String, required: true },
  bank_id: { type: Number, required: true },
  branch: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  bank_name: { type: String, required: true },
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
