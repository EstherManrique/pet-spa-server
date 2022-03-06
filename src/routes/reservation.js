'use strict'

const express = require('express');
const reservationController = require('../controllers/reservation');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete, validateListStore } = require('../validators/reservation')

router.get('/reservations', reservationController.list);

router.get('/reservations/:storeId?', validateListStore, reservationController.list);

router.post('/reservations', validateSave, reservationController.save);

router.delete('/reservations/:id', validateDelete, reservationController.delete);

router.put('/reservations/:id', validateUpdate, reservationController.update);

module.exports = router;