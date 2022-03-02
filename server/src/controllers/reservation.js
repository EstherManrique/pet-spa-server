"use strict";
const validator = require("validator");

// const mongoose = require("mongoose");
const Reservation = require("../models/reservation");

const controller = {
  list: async (request, response) => {
    const query =
      typeof request.params.storeId !== "undefined"
        ? { storeId: request.params.storeId }
        : {};
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
  },
  save: async (request, response) => {
    // Recoger parametros del POST
    const params = request.body;

    // Crear el objeto a guardar
    const newReservation = Reservation({
      clientName: params.clientName,
      petName: params.petName,
      date: params.date,
      status: params.status,
      clientEmail: params.clientEmail,
      clientPhone: params.clientPhone,
      storeId: params.storeId,
      serviceId: params.serviceId,
    });
    // Asignar valores
    // Guardar la reservation
    await newReservation.save();
    // Devolver respuesta
    return response.status(200).send({
      message: 'Reservation saved!',
      data: newReservation
    });
  },
  delete: async (request, response) => {
    const deleteReservation = await Reservation.findByIdAndDelete(
      request.params.id
    );
    console.log("Reservation Deleted:", deleteReservation);
    return response.status(200).send({
      message: "Success Reservation Deleted",
      reservation: request.params.id,
    });
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
          message: "Success, Reservation Updated",
          reservation: params,
        });
      }
    );
  },
};

module.exports = controller;
