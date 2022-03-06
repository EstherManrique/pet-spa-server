'use strict'
// Valido Token y que este vigente
const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

dotEnv.config();

const authToken = async (request, response, next) => {
  const token = request.headers.authorization;
  if(token === null) {
    return response.status(401).send({
      message: 'Unauthorized'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    request.userId = decoded.user.id;
    const user = await User.findById(request.userId, { password: 0 });
    if(!user) {
      return response.status(401).send({
        message: 'Unauthorized'
      });
    }
    request.userRoles = user.roles;
    next();

  } catch (error) {
    return response.status(500).send({
      message: 'Invalid token'
    });
  };
}

module.exports = { authToken }