const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const administratorSchema = new Schema({
  name: String,
  userName: String,
  password: String
});

module.exports = mongoose.model('Administrator', administratorSchema);