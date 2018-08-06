#!/usr/bin/env node

'use strict';

module.exports = (app) => {

  const questions = require('../controllers/question.controller');

  // create a new question
  app.post('/questions', questions.create);

  // get all questions
  app.get('/questions', questions.findAll);

  // get a single question given questionId
  app.get('/questions/:questionId', questions.findOne);

  // update a question given questionId
  app.put('/questions/:questionId', questions.update);

  // delete a question given questionId
  app.delete('/questions/:questionId', questions.delete);

}

