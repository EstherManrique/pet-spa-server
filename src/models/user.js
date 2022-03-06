const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = require("./store");
const Role = require('./role');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roles: [{
      type: Schema.ObjectId,
      ref: 'Role'
    }],
    storeId: {
      type: Schema.ObjectId,
      ref: "Store",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
