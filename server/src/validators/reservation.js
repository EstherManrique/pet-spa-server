const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("clientName")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("petName")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("date")
    .exists()
    .not()
    .isEmpty()
    .isISO8601(),
  check("status")
    .exists()
    .not()
    .isEmpty()
    .isIn(['pending', 'confirmed', 'canceled']),
  check("clientEmail")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .isEmail(),
  check("clientPhone")
    .exists()
    .not()
    .isEmpty()
    .isNumeric(),
  check('storeId')
    .isMongoId(),
  check('serviceId')
    .isMongoId(),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

const validateUpdate = [
  check('id')
    .isMongoId(),
  check("clientName")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString(),
  check("petName")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString(),
  check("date")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isISO8601(),
  check("status")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isIn(['pending', 'confirmed', 'canceled']),
  check("clientEmail")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isString()
    .isEmail(),
  check("clientPhone")
    .optional({
      checkFalsy: false
    })
    .not()
    .isEmpty()
    .isNumeric(),
  check('storeId')
    .optional({
      checkFalsy: false
    })
    .isMongoId(),
  check('serviceId')
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

const validateListStore = [
  check('storeId')
    .isMongoId()
    .withMessage('Must be a valid MongoID'),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];

module.exports = { validateSave, validateUpdate, validateDelete, validateListStore };