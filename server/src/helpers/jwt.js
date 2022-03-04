'use strict'
// Valido Token y que este vigente
const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');

dotEnv.config();

const authToken = (request, response, next) => {
  console.log(request.headers.authorization);

  const token = request.headers.authorization;

  if(token === null) {
    return response.status(401).send({
      message: 'Unauthorized'
    });
  }
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=> {
      if(error) {
        return response.status(403).send({
          message: 'Forbidden'
        });
      }
      request.user = user;
      next();
    }); 
  } catch (error) {
    return response.status(500).send({
      message: 'Invalid token'
    });
  };
}

module.exports = { authToken }