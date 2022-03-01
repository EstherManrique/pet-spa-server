"use strict";
const validator = require("validator");

// const mongoose = require("mongoose");
const Reservation = require("../models/reservation");

const controller = {
  list: async (request, response) => {
    const query = request.query.storeId
      ? { storeId: request.query.storeId }
      : {};
    let validateStoreId;
    if (query.hasOwnProperty("storeId")) {
      try {
        validateStoreId = validator.isMongoId(query.storeId);
      } catch (error) {
        return response.status(400).send({
          message: error.message,
        });
      }
    }
    if (validateStoreId || Object.keys(query).length === 0) {
      const reservations = await Reservation.find(query)
        .populate({
          path: "storeId",
          model: "Store",
        })
        .populate({
          path: "serviceId",
          model: "Service",
        })
        .exec();
      return response.status(200).send(reservations);
    } else {
      return response.status(400).send({
        message: "StoreId incorrect",
      });
    }
  },
  save: async (request, response) => {
    // Recoger parametros del POST
    const params = request.body;

    // Validar datos con validator()
    let validateClientName;
    let validatePetName;
    let validateStoreId;
    try {
      validateClientName = !validator.isEmpty(params.clientName);
      validatePetName = !validator.isEmpty(params.petName);
      validateStoreId = validator.isMongoId(params.storeId);
    } catch (error) {
      return response.status(400).send({
        message: error.message,
      });
    }

    if (validateClientName && validatePetName && validateStoreId) {
      // Crear el objeto a guardar
      const newReservation = Reservation({
        clientName: validator.escape(params.clientName),
        petName: validator.escape(params.petName),
        date: validator.escape(params.date),
        status: validator.escape(params.status),
        clientEmail: validator.escape(params.clientEmail),
        clientPhone: validator.escape(params.clientPhone),
        storeId: validator.escape(params.storeId),
        serviceId: validator.escape(params.serviceId),
      });
      // Asignar valores
      // Guardar la reservation
      await newReservation.save();
      // Devolver respuesta
      return response.status(200).send('Reservation OK!', newReservation);
    } else {
      return response.status(400).send({
        message: "Faltan datos",
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
  },
  delete: async (request, response) => {
    const deleteReservation = await Reservation.findByIdAndDelete(
      request.params.id
    );
    console.log("Reservation Deleted:", deleteReservation);
    response.send("Reservation Deleted");
  },
  update: async (request, response) => {
    const updateReservation = await request.params.id;
    console.log("Updated Reservation", updateReservation);

    const params = request.body;

    Reservation.findOneAndUpdate(
      { _id: updateReservation },
      params,
      { new: true },
      () => {
        return response.status(200).send({
          status: "Success, Reservation Updated",
          reservation: params
        });
      }
    );
  },
};

module.exports = controller;
