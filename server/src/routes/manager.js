'use strict'

const express = require('express');
const managerController = require('../controllers/manager');
const router = express.Router();
const NewManager = require('../models/manager')

router.get('/manager', managerController.list);

router.post('/manager', managerController.save);






module.exports = router;