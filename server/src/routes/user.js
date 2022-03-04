'use strict'

const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete, validateLogin } = require('../validators/user')

router.get('/users', userController.list);

router.post('/users', validateSave, userController.save);

router.delete('/users/:id', validateDelete, userController.delete);

router.put('/users/:id', validateUpdate, userController.update);

// Return JWT
router.post('/user/login', validateLogin, userController.login);
router.post('/user/register', validateSave, userController.register);

module.exports = router;