"use strict";
const Store = require("../models/store");

const controller = {
  list: async (request, response) => {
    try {
      const stores = await Store.find({}).exec();
      return response.status(200).send(stores);
    } catch (error) {
      return response.status(404).send({
        message: error.message,
      });
    }
  },

  save: async (request, response) => {
    try {
      const params = request.body;
      const newStore = Store({
        name: params.name,
        address: params.address,
        email: params.email,
        phone: params.phone,
        location: params.location,
      });
      await newStore.save();
      response.json({ message: "Store saved" });
    } catch (error) {
      return response.status(422).send({
        message: error.message,
      });
    }
  },

  delete: async (request, response) => {
  try {
    const deleteStore = await Store.findByIdAndDelete(request.params.id);
    console.log("Store Deleted:", deleteStore);
    response.send("Store Deleted");
    
  } catch (error) {
    return response.status(404).send({
      status: 'Id Error',
      message: error.message,
    });
  }
  },
  update: async (request, response) => {
    // Obtener el id de la tienda por la url
    const updateStoreId = await request.params.id;
    console.log("Updated Store", updateStoreId);
    // Obtener los datos que llegan por PUT
    const params = request.body;
    // Validar datos
    // Find and Update

    Store.findOneAndUpdate(
      { _id: updateStoreId },
      params,
      { new: true },
      () => {
        return response.status(201).send({
          status: "Success Store Updated",
          store: params,
        });
      }
    );
  },
};

module.exports = controller;
