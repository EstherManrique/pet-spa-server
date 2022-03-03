"use strict";
const Administrator = require("../models/administrator");

const controller = {
  list: async (request, response) => {
    const administrators = await Administrator.find({}).exec();
    return response.status(200).send(administrators);
  },
  save: async (request, response) => {
    const { name, userName, password } = request.body;
    const newAdminstrator = Administrator({ name, userName, password });
    await newAdminstrator.save();
    return response.status(200).send({
      Message: "Success Administrator Saved",
      administrator: request.params.id,
    });
  },
  delete: async (request, response) => {
    const deleteAdministrator = await Administrator.findByIdAndDelete(
      request.params.id
    );
    return response.status(200).send({
      Message: "Success Administrator Deleted",
      administrator: deleteAdministrator,
    });
  },
  update: async (request, response) => {
    const updateAdministratorId = await request.params.id;
    const params = request.body;
    
    Administrator.findByIdAndUpdate(updateAdministratorId, params,
      () => {
        return response.status(200).send({
          Message: "Success Administrator Updated",
          administrator: params,
        });
      }
    );
  },
};

module.exports = controller;
