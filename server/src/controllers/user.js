"use strict";
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const controller = {
  list: async (request, response) => {
    try {
      const user = await User.find({})
        .populate({
          path: "storeId",
          model: "Store",
        });
      return response.status(200).send(user);
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  login: async (request, response) => {
    const params = request.body;
    try {
      let userExists = await User.findOne({
        userName: params.userName
      });
      if(!userExists) {
        return response.status(400).send({
          message: 'User does not exists'
        });
      }
      const passMatch = await bcrypt.compare(params.password, userExists.password);
      if(!passMatch) {
        return response.status(400).send({
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
        process.env.TOKEN_SECRET, {
          expiresIn: "1h"
        },
        (err, token) => {
          if(err) {
            throw err;
          }
          return response.status(200).send({
            token
          })
        }
      )
    } catch (error) {
      
    }

  },

  register: async (request, response) => {
    const params = request.body;
    try {
      let userExists = await User.findOne({
        userName: params.userName
      });
      if(userExists) {
        return response.status(400).send({
          message: 'User already exists'
        });
      }
      const newUser = User({
        name: params.name,
        userName: params.userName,
        password: params.password,
        role: params.role,
        storeId: params.storeId
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(params.password, salt);

      await newUser.save();

      const payload = {
        user: {
          id: newUser.id
        }
      };

      jwt.sign(
        payload,
        process.env.TOKEN_SECRET, {
          expiresIn: 60000
        },
        (err, token) => {
          if(err) {
            throw err;
          }
          return response.status(200).send({
            token
          })
        }
      )
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  save: async (request, response) => {
    const params = request.body;
    try {
      let userExists = await User.findOne({
        userName: params.userName
      });
      if(userExists) {
        return response.status(400).send({
          message: 'User already exists'
        });
      }
      const newUser = User({
        name: params.name,
        userName: params.userName,
        password: params.password,
        role: params.role,
        storeId: params.storeId
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(params.password, salt);

      await newUser.save();

      return response.status(200).send({
        message: "Success User saved",
        User: params
       });
    } catch (error) {
      return response.status(400).send({
        message: error.message
      });
    }
  },

  update: async (request, response) => {
    try {
      const updateUserId = request.params.id;
      const params = request.body;
      const options = {new: true};
  
      await User.findByIdAndUpdate(updateUserId, params, options) 
        return response.status(201).send({
          message: "Success User Updated",
          User: params
        });
    } catch (error) {
      return response.status(400).send({
        status: "Id Error",
        message: error.message
      });
    }
  },

  delete: async (request, response) => {
    try {
      const deleteUser = await User.findByIdAndDelete(request.params.id);
      response.send({
        message: "User Deleted",
        User: deleteUser
      });
    } catch (error) {
      return response.status(400).send({
        status: "Id Error",
        message: error.message
      });
    }
  }
};

module.exports = controller;
