"use strict";
const Store = require("../models/store");

const controller = {
  list: async (request, response) => {
    try {
      const stores = await Store.find({});
      return response.status(200).send(stores);
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  save: async (request, response) => {
    try {
      const params = request.body;
      const newStore = Store({
        name: params.name,
        address: params.address,
        email: params.email,
        phone: params.phone,
        location: params.location
      });
      await newStore.save();
      return response.status(200).send({
        message: "Success Store saved",
        store: params
      });
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  update: async (request, response) => {
    try {
      const updateStoreId = request.params.id;
      const params = request.body;
      const options = {new: true};

      await Store.findByIdAndUpdate(updateStoreId, params, options);
        return response.status(201).send({
          message: "Success Store Updated",
          store: params
        });
    } catch (error) {
      return response.status(400).send({
        status: "Id Error",
        message: error.message
      });
    }
  },

  delete: async (request, response) => {
    try {
      const deleteStore = await Store.findByIdAndDelete(request.params.id);
      return response.send({
        message: "Success Store Deleted",
        store: deleteStore
      });
    } catch (error) {
      return response.status(400).send({
        status: "Id Error",
        message: error.message
      });
    }
  }
};

module.exports = controller;
