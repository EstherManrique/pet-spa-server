'use strict'
const Store = require('../models/store');

const controller = {
  list: async (request, response) => {
    const stores = await Store.find({}).exec();
    return response.status(200).send(stores);
  }, 
  save: async (request, response) => {
    const {name, address, email, phone, longitude, latitude} = request.body;
    console.log(request.body);

    const newStore = Store({name, address, email, phone, longitude, latitude});
    await newStore.save();
    response.json({message: 'Store saved'});
  },
  delete: async (request, response) => {
    const deleteStore = await Store.findByIdAndDelete(request.params.id);
    console.log('Store Deleted:', deleteStore);
    response.send('Store Deleted');
  }
};


module.exports = controller;