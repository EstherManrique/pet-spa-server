const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("userName")
    .exists()
    .not()
    .isEmpty()
    .matches(/^([a-zA-Z\_0-9]{5,})$/, 'g'), 
  check("password")
    .exists()
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage('Must be a strong passwor'),
  check('storeId')
    .isMongoId(),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateUpdate = [
  check('id')
    .isMongoId(),
  check("name")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString(),
  check("userName")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString()
    .matches(/^([a-zA-Z\_0-9]{5,})$/, 'g'),
  check("password")
    .optional({
      checkFalsy: false
    })
    .exists()
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage('Must be a strong password'),
  check('storeId')
    .optional({
      checkFalsy: false
    })
    .isMongoId(),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateDelete = [
  check('id')
    .isMongoId()
    .withMessage('Must be a valid MongoID'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];




module.exports = { validateSave, validateUpdate, validateDelete };
