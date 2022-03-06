'use strict'

const express = require('express');
const roleController = require('../controllers/role');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete } = require('../validators/role');
// const auth = require('./helpers/jwt.js')

router.get('/roles', roleController.list);

router.post('/roles', validateSave, roleController.save);

router.delete('/roles/:id', validateDelete, roleController.delete);

router.put('/roles/:id', validateUpdate, roleController.update);

module.exports = router;