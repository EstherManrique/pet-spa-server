'use strict'
const Service = require('../models/service');

const controller = {
  list: async (request, response) => {
    const services = await Service.find({}).exec();
    return response.status(200).send(services);
  }
};


module.exports = controller;