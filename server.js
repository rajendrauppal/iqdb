#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route to test the API server is up
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Software Coding Interview Questions Database REST API"
  });
});

// fire up the server - listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

