'use strict'
/* if(process.env.NODE_ENV !== 'production') {
  // Manage enenvironmental variables
  require('dotenv').config();
}; */

// Manage enenvironmental variables
require('dotenv').config();

// Getting modules to create server
const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

// Initializations express (http)
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Cargar ficheros rutas
const storeRoutes = require('./routes/store');
const serviceRoutes = require('./routes/service');
const reservationRoutes = require('./routes/reservation');
const managerRoutes = require('./routes/manager');
const administratorRoutes = require('./routes/administrator');

// Middlwares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// Cors

// Añadir prefijo a rutas / cargar rutas
app.use('/api', storeRoutes);
app.use('/api', serviceRoutes);
app.use('/api', reservationRoutes);
app.use('/api', managerRoutes);
app.use('/api', administratorRoutes);

// Satic files
app.use(express.static(path.join(__dirname, './public')));



// Exportar módulo 
module.exports = app;