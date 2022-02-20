const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: String,
  address: String,
  email: String,
  phone: Number,
  longitude: Number,
  latitude: Number
});

module.exports = mongoose.model('Store', storeSchema);