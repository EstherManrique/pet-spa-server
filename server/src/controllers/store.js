'use strict'
const Store = require('../models/store');

const controller = {
  list: async (request, response) => {
    const stores = await Store.find({}).exec();
    return response.status(200).send(stores);
  }
};


module.exports = controller;