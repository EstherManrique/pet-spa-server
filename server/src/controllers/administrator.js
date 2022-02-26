'use strict'
const Administrator = require('../models/administrator');

const controller = {
  list: async (request, response) => {
    const administrators = await Administrator.find({}).exec();
    return response.status(200).send(administrators);
  },
  save: async (request, response) => {
    const {name, userName, password} = request.body;
    console.log(request.body);

    const newAdminstrator = Administrator({name, userName, password});
    await newAdminstrator.save();
    response.json({message: 'Adminstrator saved'});
  },
  delete: async (request, response) => {
    const deleteAdministrator = await Administrator.findByIdAndDelete(request.params.id);
    console.log('Manager Deleted:', deleteAdministrator);
    response.send('Administrator Deleted');
  }
};

module.exports = controller;