#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');

// create express app
const securityConfig = require('./config/security.config');
const app = express();

// set app secret
app.set('superSecret', securityConfig.secret);

// setup morgan for console logging
app.use(morgan('dev'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// configure the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connect to the database
const options = {
  "authSource": "admin",
  useNewUrlParser: true
};

mongoose.connect(dbConfig.url, options)
  .then(() => {
    console.log("Successfully connected to mongodb");
  })
  .catch(err => {
    console.log("Could not connect to mongodb. Exiting now...");
    process.exit();
  });

// define a simple route to test the API server is up
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Software Coding Interview Questions Database REST API"
  });
});

// protect API routes with authentication
const apiRoutes = express.Router();
const user = require('./app/controllers/user.controller');

apiRoutes.use(user.authorize);

app.use('/api/v1', apiRoutes);

// setup routes
require('./app/routes/question.routes')(app);
require('./app/routes/user.routes')(app);

// fire up the server - listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = app;

