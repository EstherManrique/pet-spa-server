'use strict'
// const validator = require('validator');
const Manager = require('../models/manager');

const controller = {
  list: async (request, response) => {
    const managers = await Manager.find({}).populate({
      path: 'storeId',
      model: 'Store'
    }).exec();
    return response.status(200).send(managers);
  },
  save: async (request, response) => {
    const params = request.body;
    console.log(params);

   const newManager = Manager({params});
   await newManager.save();
   response.json({message: 'Manager saved'});
  }

};

module.exports = controller;