'use strict'

const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const { validateSave, validateLogin } = require('../validators/auth')

// Return JWT
router.post('/auth/login', validateLogin, authController.login);
router.post('/auth/register', authController.register);

module.exports = router;