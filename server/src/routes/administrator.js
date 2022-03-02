'use strict'

const express = require('express');
const administratorController = require('../controllers/administrator');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete } = require('../validators/administrator')

router.get('/administrator', administratorController.list);

router.post('/administrator', validateSave, administratorController.save);

router.delete('/administrator/:id', validateDelete, administratorController.delete);

router.put('/administrator/:id', validateUpdate, administratorController.update);

module.exports = router;