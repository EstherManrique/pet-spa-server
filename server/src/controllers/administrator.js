'use strict'
const Administrator = require('../models/administrator');

const controller = {
  list: async (request, response) => {
    const administrator = await Administrator.find({}).exec();
    return response.status(200).send(administrator);
  }
};

module.exports = controller;