'use strict'

const express = require('express');
const administratorController = require('../controllers/administrator');
const router = express.Router();

router.get('/administrator', administratorController.list);


module.exports = router;