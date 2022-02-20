'use strict'

const express = require('express');
const managerController = require('../controllers/manager');
const router = express.Router();

router.get('/manager', managerController.list);


module.exports = router;