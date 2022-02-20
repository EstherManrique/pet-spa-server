'use strict'

const express = require('express');
const reservationController = require('../controllers/reservation');
const router = express.Router();

router.get('/reservations', reservationController.list);
router.post('/reservations', reservationController.save);

module.exports = router;