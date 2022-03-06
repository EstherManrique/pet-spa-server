const { validationResult } = require("express-validator");
const Role = require('../models/role');

const validateResult = (request, response, next) => {
  try {
    validationResult(request).throw();
    return next();
  } catch (error) {
    response.status(403);
    response.send({ error: error.array() });
  }
};

const getMongoRoles = (roles) => {
  return Role.find({ name: { $in: roles }}).distinct('_id');
}

const compareRoles = (allowedRoles, givenRoles) => {
  return allowedRoles.some(r=> givenRoles.indexOf(r) >= 0);
}

module.exports = { validateResult, compareRoles, getMongoRoles };