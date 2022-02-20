"use strict";
const mongoose = require("mongoose");
const app = require('./app');
const port = 3001;




// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/pet_spa", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected');

    // Crear servidor y escuchar peticiones http
    app.listen(port, () => {
      console.log('Server run on http://localhost:' + port);
    })
  });
