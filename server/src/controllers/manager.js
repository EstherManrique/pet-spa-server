"use strict";
const Manager = require("../models/manager");

const controller = {
  list: async (request, response) => {
    try {
      const managers = await Manager.find({})
        .populate({
          path: "storeId",
          model: "Store",
        });
      return response.status(200).send(managers);
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  save: async (request, response) => {
    try {
      const params = request.body;
      const newManager = Manager({
        name: params.name,
        userName: params.userName,
        password: params.password,
        storeId: params.storeId
       });
      await newManager.save();
      return response.status(200).send({
        message: "Success Manager saved",
        manager: params
       });
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  update: async (request, response) => {
    try {
      const updateManagerId = request.params.id;
      const params = request.body;
      const options = {new: true};
  
      await Manager.findByIdAndUpdate(updateManagerId, params, options) 
        return response.status(201).send({
          message: "Success Manager Updated",
          manager: params
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
      const deleteManager = await Manager.findByIdAndDelete(request.params.id);
      response.send({
        message: "Manager Deleted",
        manager: deleteManager
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
