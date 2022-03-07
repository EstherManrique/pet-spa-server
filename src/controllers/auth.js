"use strict";
const User = require("../models/user");
const Role = require('../models/role');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const controller = {

  login: async (request, response) => {
    const params = request.body;
    try {
      let userExists = await User.findOne({
        email: params.email
      });
      if(!userExists) {
        return response.status(400).json({
          message: 'User does not exists'
        });
      }
      const passMatch = await bcrypt.compare(params.password, userExists.password);
      if(!passMatch) {
        return response.status(401).json({
          message: 'Password incorrect'
        });
      }
      const payload = {
        user: {
          id: userExists.id
        }
      };
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
          expiresIn: "10h"
        },
        (err, token) => {
          if(err) {
            throw err;
          }
          return response.status(200).json({
            token
          })
        }
      )
    } catch (error) {
      
    }

  },

  register: async (request, response) => {
    const { name, userName, password, email, storeId, roles } = request.body;
    try {

      // Validate if user exists
      let userExists = await User.findOne({
        userName: userName
      });
      if(userExists) {
        return response.status(400).json({
          message: 'User already exists'
        });
      }

      // Create new user object
      const newUser = User({
        name,
        userName,
        password,
        email,
        storeId
      });

      // Validate if user has roles
      if(roles) {
        // Get roles from mongo
        const foundRoles = await Role.find({ name: { $in: roles }});
        // Get roles ID's
        newUser.roles = foundRoles.map(role => role._id);
      } else {
        // Asign default role
        const role = await Role.findOne({ name: 'Client' });
        newUser.roles = [role._id];
      }

      // Password encrypt
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      // User save
      await newUser.save();

      const payload = {
        user: {
          id: newUser.id
        }
      };

      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
          expiresIn: '10h'
        },
        (err, token) => {
          if(err) {
            throw err;
          }
          return response.status(200).json({
            token
          })
        }
      )
    } catch (error) {
      return response.status(400).json({
        message: error.message
      });
    }
  },

};

module.exports = controller;