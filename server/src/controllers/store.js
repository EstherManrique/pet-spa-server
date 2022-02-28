"use strict";
const Store = require("../models/store");

const controller = {
  list: async (request, response) => {
    const stores = await Store.find({}).exec();
    return response.status(200).send(stores);
  },
  save: async (request, response) => {
    const params = request.body;

    const newStore = Store({
      name: params.name,
      address: params.address,
      email: params.email,
      phone: params.phone,
      location: params.location
    });
    await newStore.save();
    response.json({ message: "Store saved" });
  },
  delete: async (request, response) => {
    const deleteStore = await Store.findByIdAndDelete(request.params.id);
    console.log("Store Deleted:", deleteStore);
    response.send("Store Deleted");
  },
  update: async (request, response) => {
    // Obtener el id de la tienda por la url
    const updateStoreId = await request.params.id;
    console.log('Updated Store', updateStoreId);
    // Obtener los datos que llegan por PUT
    const params = request.body;
    // Validar datos
    // Find and Update

    Store.findOneAndUpdate({_id: updateStoreId}, params, {new: true}, () => {
      return response.status(200).send({
        status: 'Success Store Updated',
        store: params
      })
    });

    // const {name, address, email, phone, longitude, latitude } = request.body;
    // const updateStore = await Store.findByIdAndUpdate(request.params.id, {name, address, email, phone, longitude, latitude});
    // console.log('Store Updated:', updateStore);
    // response.send('Store Finded');
  },
};

module.exports = controller;
