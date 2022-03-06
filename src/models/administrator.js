const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const administratorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
}
);

module.exports = mongoose.model('Administrator', administratorSchema);