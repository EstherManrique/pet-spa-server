// import { Mongoose } from 'mongoose';
import express from "express";

// Importing Routes
import IndexRoutes from './routes'

// Initializations
const app = express();
// Settings
app.set("port", 3001);

// Middlewares
// Routes
app.use('/api', IndexRoutes);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
