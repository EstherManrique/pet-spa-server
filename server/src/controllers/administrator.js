"use strict";
const Administrator = require("../models/administrator");

const controller = {
  list: async (request, response) => {
    try {
      const administrators = await Administrator.find({});
      return response.status(200).send(administrators);
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  save: async (request, response) => {
    try {
      const params = request.body;
      const newAdminstrator = Administrator({
        name: params.name,
        userName: params.userName,
        password: params.password
      });
      await newAdminstrator.save();
      return response.status(200).send({
        message: "Success Administrator Saved",
        administrator: params
      });
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  update: async (request, response) => {
    try {
      const updateAdministratorId = request.params.id;
      const params = request.body;
      const options = {new: true};

      await Administrator.findByIdAndUpdate(updateAdministratorId, params, options)
        return response.status(201).send({
          message: "Success Administrator Updated",
          administrator: params
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
      const deleteAdministrator = await Administrator.findByIdAndDelete(request.params.id);
      return response.status(200).send({
        message: "Success Administrator Deleted",
        administrator: deleteAdministrator
      });
    } catch (error) {
      return response.status(400).send({
        status: "Id Error",
        message: error.message
      });
    }
  },
};

module.exports = controller;
