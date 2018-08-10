#!/usr/bin/env node

'use strict';

module.exports = (app) => {

  const questions = require('../controllers/question.controller');

  // create a new question
  app.post('/api/v1/questions', questions.create);

  // get all questions
  app.get('/api/v1/questions', questions.findAll);

  // get a single question given questionId
  app.get('/api/v1/questions/:questionId', questions.findOne);

  // update a question given questionId
  app.put('/api/v1/questions/:questionId', questions.update);

  // delete a question given questionId
  app.delete('/api/v1/questions/:questionId', questions.delete);

}

