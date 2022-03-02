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
  },
  update: async(request, response) => {
    try {
      const updateServiceId = await request.params.id;
      console.log('Service Updated',updateServiceId);
  
      const params = request.body;
      Service.findOneAndUpdate({_id: updateServiceId}, params, {new: true}, () => {
        return response.status(200).send({
          status: 'Success, Service Updated',
          service: params
        });
      });
      
    } catch (error) {
      return response.status(404).send({
        status: 'Id Errooooor',
        message: error.message,
      });
    }

  }
};


module.exports = controller;