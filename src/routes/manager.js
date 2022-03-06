'use strict'

const express = require('express');
const managerController = require('../controllers/manager');
const router = express.Router();
const { validateSave, validateUpdate, validateDelete } = require('../validators/manager')

router.get('/managers', managerController.list);

router.post('/managers', validateSave, managerController.save);

router.delete('/managers/:id', validateDelete, managerController.delete);

router.put('/managers/:id', validateUpdate, managerController.update);







module.exports = router;