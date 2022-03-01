'use strict'

const express = require('express');
const storeController = require('../controllers/store');
const router = express.Router();
const { validateSave } = require('../validators/store')

router.get('/stores', storeController.list);

router.post('/stores', validateSave, storeController.save);

router.delete('/stores/:id', storeController.delete);

router.put('/stores/:id', storeController.update);


module.exports = router;