'use strict'

// Getting modules to create server
const cors = require('cors');
const express = require('express');
const unLess = require('express-unless');
const path = require('path');
const auth = require('./helpers/jwt.js')
// const bodyParser = require('body-parser');
// Getting routes files
const storeRoutes = require('./routes/store');
const serviceRoutes = require('./routes/service');
const reservationRoutes = require('./routes/reservation');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const authRoutes = require('./routes/auth')

if(process.env.NODE_ENV !== 'production') {
  // Manage enenvironmental variables
  require('dotenv').config();
};

// Initializations express (http)
const app = express();
auth.authToken.unless = unLess;
app.use(auth.authToken.unless({
  path: [
    {
      url: '/api/auth/login',
      methods: ['POST']
    },
    {
      url: '/api/auth/register',
      methods: ['POST']
    },
    {
      url: '/api/stores',
      methods: ['GET']
    },
    {
      url: '/api/services',
      methods: ['GET']
    },
  ]
}))

// Settings
app.set('port', process.env.PORT || 4000);

// Middlwares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Cors
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// Added prefix to routes
app.use('/api', storeRoutes);
app.use('/api', serviceRoutes);
app.use('/api', reservationRoutes);
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', authRoutes);

// Satic files
app.use(express.static(path.join(__dirname, './public')));

// Exportar módulo 
module.exports = app;