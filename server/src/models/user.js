const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = require("./store");

const userSchema = new Schema(
  {
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
    },
    role: {
      type: String,
      required: true
    },
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
