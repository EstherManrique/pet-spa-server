const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = require('./store');
const Service = require('./service');

const reservationSchema = new Schema({
  clientName: {
    type: String,
    required: true
  },
  petName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  },
  clientEmail: {
    type: String,
    required: false
  },
  clientPhone: {
    type: Number,
    required: true
  },
  storeId: {
    type: Schema.ObjectId,
    ref: "Store",
  }, 
  serviceId: {
    type: Schema.ObjectId,
    ref: "Service",
  }
},
{
  timestamps: true,
  versionKey: false
}
);

module.exports = mongoose.model("Reservation", reservationSchema);