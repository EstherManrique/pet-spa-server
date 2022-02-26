"use strict";
// const validator = require('validator');
const Manager = require("../models/manager");

const controller = {
  list: async (request, response) => {
    const managers = await Manager.find({})
      .populate({
        path: "storeId",
        model: "Store",
      })
      .exec();
    return response.status(200).send(managers);
  },
  save: async (request, response) => {
    const { name, userName, password, storeId } = request.body;
    console.log(request.body);

    const newManager = Manager({ name, userName, password, storeId });
    await newManager.save();
    response.json({ message: "Manager saved" });
  },
  delete: async (request, response) => {
    const deleteManager = await Manager.findByIdAndDelete(request.params.id);
    console.log('Manager Deleted:', deleteManager);
    response.send("Manager Deleted");
  },
};

module.exports = controller;
