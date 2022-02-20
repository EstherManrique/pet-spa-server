'use strict'
const Manager = require('../models/manager');

const controller = {
  list: async (request, response) => {
    const managers = await Manager.find({}).exec();
    return response.status(200).send(managers);
  }
};

module.exports = controller;