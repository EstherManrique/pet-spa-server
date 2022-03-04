'use strict'

const express = require('express');
const administratorController = require('../controllers/administrator');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete } = require('../validators/administrator')

router.get('/administrators', administratorController.list);

router.post('/administrators', validateSave, administratorController.save);

router.delete('/administrators/:id', validateDelete, administratorController.delete);

router.put('/administrators/:id', validateUpdate, administratorController.update);

module.exports = router;