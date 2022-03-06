'use strict'

const express = require('express');
const serviceController = require('../controllers/service');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete } = require('../validators/service')

router.get('/services', serviceController.list);

router.post('/services', validateSave, serviceController.save);

router.delete('/services/:id', validateDelete, serviceController.delete);

router.put('/services/:id', validateUpdate,  serviceController.update);


module.exports = router;