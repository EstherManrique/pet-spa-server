'use strict'

const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete } = require('../validators/user')

router.get('/users', userController.list);

router.post('/users', validateSave, userController.save);

router.delete('/users/:id', validateDelete, userController.delete);

router.put('/users/:id', validateUpdate, userController.update);

module.exports = router;