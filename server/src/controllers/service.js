'use strict'
const Service = require('../models/service');

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
    try {
      const params = request.body;
      const newService = Service({
        name: params.name,
        description: params.description,
        price: params.price
      });
      await newService.save();
      return response.status(200).send({
        message: 'Success Service saved',
        service: params
      });
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  update: async(request, response) => {
    try {
      const updateServiceId = request.params.id;
      const params = request.body;

      await Service.findByIdAndUpdate(updateServiceId, params)
        return response.status(201).send({
          message: 'Success Service Updated',
          service: params
        });
    } catch (error) {
      return response.status(400).send({
        status: 'Id Error',
        message: error.message
      });
    }
  },

  delete: async (request, response) => {
    try {
      const deleteService = await Service.findByIdAndDelete(request.params.id);
      return response.send({
        message: 'Success Service Deleted',
        service: deleteService
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