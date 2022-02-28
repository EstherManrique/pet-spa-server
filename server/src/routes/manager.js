'use strict'

const express = require('express');
const managerController = require('../controllers/manager');
const router = express.Router();
const NewManager = require('../models/manager')

router.get('/manager', managerController.list);

router.post('/manager', managerController.save);

router.delete('/manager/:id',managerController.delete);

router.put('/manager/:id',managerController.update);


// router.put('/manager', managerController.update);





module.exports = router;