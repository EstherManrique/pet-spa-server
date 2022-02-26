'use strict'

const express = require('express');
const administratorController = require('../controllers/administrator');
const router = express.Router();

router.get('/administrator', administratorController.list);

router.post('/administrator', administratorController.save);

router.delete('/administrator/:id', administratorController.delete);


module.exports = router;