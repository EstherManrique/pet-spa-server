const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name").exists().not().isEmpty().isString(),
  check("address").exists().not().isEmpty().isString(),
  check("email").exists().not().isEmpty().isString().isEmail(),
  check("phone").exists().not().isEmpty().isNumeric(),
  check("location").exists().not().isEmpty().isString(),
  (request, response, next) => {
    validateResult(request, response, next);
  },
];

const validateUpdate = [
  check("id").isMongoId(),
  check("name")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isString(),
  check("address")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isString(),
  check("email")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isEmail(),
  check("phone")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isNumeric(),
  check("location")
    .optional({
      checkFalsy: false,
    })
    .not()
    .isEmpty()
    .isString(),
  (request, response, next) => {
    validateResult(request, response, next);
  },
];

const validateDelete = [
  check("id").isMongoId().withMessage("Must be a valid MongoID"),
  (request, response, next) => {
    validateResult(request, response, next);
  },
];

module.exports = { validateSave, validateUpdate, validateDelete };
