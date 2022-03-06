"use strict";
const Role = require("../models/role");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

const controller = {
  list: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.role.get);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const roles = await Role.find({});
        return response.status(200).send(roles);
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

  save: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.role.put);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const params = request.body;
        const newRole = new Role({
          name: params.name,
        });
        await newRole.save();
        return response.status(200).send({
          message: "Success Role saved",
          role: params,
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
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.role.update);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const updateRoleId = request.params.id;
        const params = request.body;

        await Role.findByIdAndUpdate(updateRoleId, params);
        return response.status(201).send({
          message: "Success Role Updated",
          role: params,
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
    const allowedRoles = await helpers.getMongoRoles(["Administrator"]);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const deleteRole = await Role.findByIdAndDelete(request.params.id);
        return response.send({
          message: "Success Role Deleted",
          service: deleteRole,
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
