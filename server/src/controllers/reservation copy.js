'use strict'
const validator = require('validator');

const mongoose = require('mongoose');
const Reservation = require('../models/reservation');

const controller = {
  list: async (request, response) => {
    const reservations = await Reservation.find({}).populate({
      path: 'storeId',
      model: 'Store'
    }).populate({
      path:'serviceId',
      model:'Service'
    })
    .exec();
    return response.status(200).send(reservations);
  },
  save: async (request, response) => {
    // Recoger parametros del POST
    const params = request.body;

    // Validar datos con validator()
    let validateClientName;
    let validatePetName;
    try {
      validateClientName = !validator.isEmpty(params.name);
      validatePetName = validator.trim(params.petName) && !validator.isEmpty(params.petName);
    } catch (error) {
      return response.status(400).send({
        message: error.message,
      });
    }

    if(validateClientName && validatePetName) {
      // Crear el objeto a guardar
      // Asignar valores
      // Guardar la reservation
      // Devolver respuesta
      
      return response.status(200).send({
        reservation: params
      })
    } else {
      return response.status(400).send({
        message: 'Faltan datos',
      });
    }

    /* const reservation = await new Reservation({
      clientName: 'Dianyela Maldonado',
      petName: 'Mora',
      date: Date.now(),
      status: 'pending',
      storeId: mongoose.Types.ObjectId('62116039f9470329c3127964'), 
      serviceId: mongoose.Types.ObjectId('62115844f9470329c3127963')
    });
    reservation.save((err, results) => {
      console.log(results._id);
    }); */
    
  }
};

module.exports = controller;