"use strict";
const Service = require("../models/service");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

const controller = {
  list: async (request, response) => {
    try {
      const services = await Service.find({});
      return response.status(200).json(services);
    } catch (error) {
      return response.status(400).json({
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
        return response.status(200).json({
          message: "Success Service saved",
          service: params,
        });
      } catch (error) {
        return response.status(400).json({
          message: error.message,
        });
      }
    } else {
      return response.status(403).json({
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
        return response.status(201).json({
          message: "Success Service Updated",
          service: params,
        });
      } catch (error) {
        return response.status(400).json({
          status: "Id Error",
          message: error.message,
        });
      }
    } else {
      return response.status(403).json({
        message: "Forbidden",
      });
    }
  },

  delete: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.services.delete);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const deleteService = await Service.findByIdAndDelete(request.params.id);
        return response.json({
          message: "Success Service Deleted",
          service: deleteService,
        });
      } catch (error) {
        return response.status(400).json({
          status: "Id Error",
          message: error.message,
        });
      }
    } else {
      return response.status(403).json({
        message: "Forbidden",
      });
    }
  },
};

module.exports = controller;
