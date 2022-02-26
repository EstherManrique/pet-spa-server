"use strict";
const validator = require("validator");

const mongoose = require("mongoose");
const Reservation = require("../models/reservation");

const controller = {
  list: async (request, response) => {
    const reservations = await Reservation.find({})
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
    const { clientName, petName, date, status, storeId, serviceId } =
      request.body;
    console.log(request.body);

    const newReservation = Reservation({
      clientName,
      petName,
      date,
      status,
      storeId,
      serviceId,
    });
    await newReservation.save();
    response.send({ message: "Reservation Saved" });
  },
  delete: async (request, response) => {
    const deleteReservation = await Reservation.findByIdAndDelete(
      request.params.id
    );
    console.log("Reservation Deleted:", deleteReservation);
    response.send("Reservation Deleted");
  },

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
};

module.exports = controller;
