'use strict'
const Service = require('../models/service');

const controller = {
  list: async (request, response) => {
    const services = await Service.find({}).exec();
    return response.status(200).send(services);
  },
  save: async (request, response) => {
    const {name, description, price} = request.body;
    console.log(request.body);

    const newService = Service({name, description, price});
    await newService.save();
    response.json({message: 'Service saved'});
  },
  delete: async (request, response) => {
    const deleteService = await Service.findByIdAndDelete(request.params.id);
    console.log('Service Deleted:', deleteService);
    response.send('Service Deleted');
  }
};


module.exports = controller;