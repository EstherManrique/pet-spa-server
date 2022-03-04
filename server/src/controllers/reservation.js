"use strict";
const Reservation = require("../models/reservation");

const controller = {
  list: async (request, response) => {
    try {
      const query = typeof request.params.storeId !== "undefined"
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
        });
      return response.status(200).send(reservations);
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  save: async (request, response) => {
    try {
      const params = request.body;  
      const newReservation = Reservation({
        clientName: params.clientName,
        petName: params.petName,
        date: params.date,
        status: params.status,
        clientEmail: params.clientEmail,
        clientPhone: params.clientPhone,
        storeId: params.storeId,
        serviceId: params.serviceId
      });
      await newReservation.save();
      return response.status(200).send({
        message: 'Success Reservation saved',
        reservation: newReservation
      });
      
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  update: async (request, response) => {
    try {
      const updateReservation = request.params.id;
      const params = request.body;
      const options = {new: true};
  
      await Reservation.findByIdAndUpdate(updateReservation, params, options)
        return response.status(200).send({
          message: "Success Reservation Updated",
          reservation: params,
        });
    } catch (error) {
      return response.status(400).send({
        status: "Id Error",
        message: error.message
      });
    }
  },

  delete: async (request, response) => {
    try {
      const deleteReservation = await Reservation.findByIdAndDelete(request.params.id);
      return response.status(200).send({
        message: "Success Reservation Deleted",
        reservation: deleteReservation,
      });
    } catch (error) {
      return response.status(400).send({
        status: "Id Error",
        message: error.message
      });
    }
  }
};

module.exports = controller;
