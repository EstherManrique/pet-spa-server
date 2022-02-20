'use strict'

// Cargar modulos para crear el servidor
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express (http)
const app = express();

// Cargar ficheros rutas
const storeRoutes = require('./routes/store');
const serviceRoutes = require('./routes/service');
const reservationRoutes = require('./routes/reservation');
const managerRoutes = require('./routes/manager');
const administratorRoutes = require('./routes/administrator');

// Middlwares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors

// Añadir prefijo a rutas / cargar rutas
app.use('/api', storeRoutes);
app.use('/api', serviceRoutes);
app.use('/api', reservationRoutes);
app.use('/api', managerRoutes);
app.use('/api', administratorRoutes);

// Exportar módulo 
module.exports = app;