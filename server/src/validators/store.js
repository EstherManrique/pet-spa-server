const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateSave = [
  check("name")
  .exists()
  .not()
  .isEmpty(),
  check("address")
  .exists()
  .not()
  .isEmpty(),
  check('email')
  .exists()
  .not()
  .isEmpty()
  .isEmail(),
  check('phone')
  .exists()
  .not()
  .isEmpty()
  .isNumeric(),
  check('location')
  .exists()
  .not()
  .isEmpty()
  .isString(),
  (request, response, next) => {
    validateResult(request, response, next);
  }  
];




module.exports = { validateSave };
