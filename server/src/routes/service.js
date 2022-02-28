'use strict'

const express = require('express');
const serviceController = require('../controllers/service');
const router = express.Router();

router.get('/services', serviceController.list);

router.post('/services', serviceController.save);

router.delete('/services/:id', serviceController.delete);

router.put('/services/:id', serviceController.update);


module.exports = router;