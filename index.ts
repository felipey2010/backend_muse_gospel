import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './src/routes';

dotenv.config();

//using this to define a particular directory
// const requireDir = require("require-dir")

const app: Application = express();

//MIDDLEWARES
//Get JSON data from the database upon requests
app.use(express.json());
app.use(cors());

//folder to create our models
// requireDir("./src/models")

//routes file
app.use('/api', router);

//URL of the database
const PORT = Number(process.env.PORT) || 5000;

//Start the server
app.listen(PORT, () => {
  console.log('Now listening for request at port: ' + PORT);
});

//https://www.youtube.com/watch?v=ldYcgPKEZC8
