"use strict";
const User = require("../models/user");
const Role = require('../models/role');
const bcrypt = require("bcryptjs");
const helpers = require("../helpers/validateHelper");
const accessControl = require('../helpers/accessControl');

const controller = {
  list: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.users.get);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const users = await User.find({}, { password: 0 })
        .populate({
          path: "roles",
          model: "Role"
        })
        .populate({
          path: "storeId",
          model: "Store",
        });
        return response.status(200).send(users);
      } catch (error) {
        return response.status(400).send({
          message: error.message
        });
      }
    } else {
      return response.status(403).send({
        message: "Forbidden",
      });
    }
  },

  save: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.users.post);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      const { name, userName, password, email, storeId, roles } = request.body;
      try {
        // Validate if user exists
        let userExists = await User.findOne({
          userName: userName
        });
        if(userExists) {
          return response.status(400).send({
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
  
        return response.status(200).send({
          message: "Success User saved",
          user: newUser._id
         });
      } catch (error) {
        return response.status(400).send({
          message: error.message
        });
      } 
    } else {
      return response.status(403).send({
        message: "Forbidden",
      });
    }
  },

  update: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.users.put);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
      try {
        const updateUserId = request.params.id;
        const params = request.body;
        const options = {new: true};

        // New Password encrypt
        if(params.password) {
          const salt = await bcrypt.genSalt(10);
          params.password = await bcrypt.hash(params.password, salt);
        }
    
        await User.findByIdAndUpdate(updateUserId, params, options) 
          return response.status(201).send({
            message: "Success User Updated",
            user: updateUserId
          });
      } catch (error) {
        return response.status(400).send({
          status: "Id Error",
          message: error.message
        });
      }
    } else {
      return response.status(403).send({
        message: "Forbidden",
      });
    }
  },

  delete: async (request, response) => {
    const allowedRoles = await helpers.getMongoRoles(accessControl.permissions.users.delete);
    if (helpers.compareRoles(allowedRoles, request.userRoles)) {
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
    } else {
      return response.status(403).send({
        message: "Forbidden",
      });
    }
  }
};

module.exports = controller;
