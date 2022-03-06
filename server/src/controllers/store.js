"use strict";
const Store = require("../models/store");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

const controller = {
  list: async (request, response) => {
    try {
      const stores = await Store.find({});
      return response.status(200).send(stores);
    } catch (error) {
      return response.status(400).send({
        message: error.message,
      });
    }
  },

  save: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.store.post);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const params = request.body;
        const newStore = new Store({
          name: params.name,
          address: params.address,
          email: params.email,
          phone: params.phone,
          location: params.location,
        });
        await newStore.save();
        return response.status(200).send({
          message: "Success Store saved",
          store: params,
        });
      } catch (error) {
        return response.status(400).send({
          message: error.message,
        });
      }
    } else {
      return response.status(403).send({
        message: "Forbidden",
      });
    }
  },

  update: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.store.put);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const updateStoreId = request.params.id;
        const params = request.body;
        const options = { new: true };

        await Store.findByIdAndUpdate(updateStoreId, params, options);
        return response.status(201).send({
          message: "Success Store Updated",
          store: params,
        });
      } catch (error) {
        return response.status(400).send({
          status: "Id Error",
          message: error.message,
        });
      }
    } else {
      return response.status(403).send({
        message: "Forbidden",
      });
    }
  },

  delete: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.stores.delete);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const deleteStore = await Store.findByIdAndDelete(request.params.id);
        return response.send({
          message: "Success Store Deleted",
          store: deleteStore,
        });
      } catch (error) {
        return response.status(400).send({
          status: "Id Error",
          message: error.message,
        });
      }
    } else {
      return response.status(403).send({
        message: "Forbidden",
      });
    }
  },
};

module.exports = controller;
