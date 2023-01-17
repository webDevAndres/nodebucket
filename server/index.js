/*
============================================
 Title: index.js
 Author: Andres Macias
 Date:   01/15/23
 Description: contains database connection and wire up for server
===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./data/config.json');
/**
 * needed for swagger to work
 */
const EmployeeAPI = require('./routes/employee-api');
// const bodyParser = require("body-parser");
let swaggerUi = require("swagger-ui-express");
let swaggerJsdoc = require("swagger-jsdoc");


const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ 'extended': true }));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// default server port value.
const PORT = process.env.PORT || 3000;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN = config.dbconn;

/**
 * Database connection.
 */

mongoose.set('strictQuery', false);

mongoose.connect(CONN).then(
  () => {
    console.log('Connection to the database was successful');
  },
  err => {
    console.log(config.mongoServerError + ': ' + err.message);
  });


mongoose.connection.on('error', err => {
  console.log(config.mongoServerError + ': ' + err.message);
});

mongoose.connection.on('disconnected', err => {
  console.log('Server disconnected from host (MongoDB Atlas');
});

/**
 * APIS go here
 */



const options = {
  definition: {
      openapi: '3.0.0',
      explorer: true,
      info: {
          title: 'WEB 450 RESTful APIs',
          version: '1.0.0',
      },
  },
  apis: ['./server/routes/employee-api.js']
};

let openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api/employees', EmployeeAPI);


// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
