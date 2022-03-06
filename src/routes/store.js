'use strict'

const express = require('express');
const storeController = require('../controllers/store');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete } = require('../validators/store')

router.get('/stores', storeController.list);

router.post('/stores', validateSave, storeController.save);

router.delete('/stores/:id', validateDelete, storeController.delete);

router.put('/stores/:id', validateUpdate, storeController.update);

module.exports = router;