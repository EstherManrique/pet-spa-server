'use strict'

const express = require('express');
const reservationController = require('../controllers/reservation');
const router = express.Router();

router.get('/reservations', reservationController.list);

router.post('/reservations', reservationController.save);

router.delete('/reservations/:id', reservationController.delete);

router.put('/reservations/:id', reservationController.update);

module.exports = router;