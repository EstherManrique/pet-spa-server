"use strict";
const Service = require("../models/service");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

const controller = {
  list: async (request, response) => {
    try {
      const services = await Service.find({});
      return response.status(200).send(services);
    } catch (error) {
      return response.status(400).send({
        message: error.message,
      });
    }
  },

  save: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.services.post);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const params = request.body;
        const newService = Service({
          name: params.name,
          description: params.description,
          price: params.price,
        });
        await newService.save();
        return response.status(200).send({
          message: "Success Service saved",
          service: params,
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
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.services.put);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const updateServiceId = request.params.id;
        const params = request.body;

        await Service.findByIdAndUpdate(updateServiceId, params);
        return response.status(201).send({
          message: "Success Service Updated",
          service: params,
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
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.services.delete);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const deleteService = await Service.findByIdAndDelete(request.params.id);
        return response.send({
          message: "Success Service Deleted",
          service: deleteService,
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
