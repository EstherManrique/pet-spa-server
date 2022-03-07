"use strict";
// Conect to DB
const mongoose = require("mongoose");
const app = require('./app');

// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected');

    // Start the server and listening requests http
    app.listen(app.get('port'), () => {
      console.log(`Server on port ${app.get('port')}`);
    })
  })
  .catch(error => console.log(error));
  
