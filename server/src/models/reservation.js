const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = require('./store');
const Service = require('./service');

const reservationSchema = new Schema({
  clientName: String,
  petName: String,
  date: {
    type: Date,
    default: Date.now
  },
  status: String,
  storeId: {
    type: Schema.ObjectId,
    ref: "Store",
  }, 
  serviceId: {
    type: Schema.ObjectId,
    ref: "Service",
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);