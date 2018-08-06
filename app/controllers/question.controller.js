#!/usr/bin/env node

'use strict';

const Question = require('../models/question.model');

// create and save a new question
exports.create = (req, res) => {

  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Input cannot be empty"
    });
  }

  // create a question
  const question = new Question({
    statement: req.body.statement,
    solutions: req.body.solutions,
    difficultyLevel: req.body.difficultyLevel,
    category: req.body.category,
    subCategory: req.body.subCategory
  });

  // save the question in the database
  question.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving the Question."
      });
    });

}

// fetch and return all questions from mongodb
exports.findAll = (req, res) => {

  Question.find()
    .then(questions => {
      res.send(questions);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching all questions."
      });
    });

}

// fetch and return a single question
exports.findOne = (req, res) => {

  Question.findById(req.params.questionId)
    .then(question => {
      if (!question) {
        res.status(404).send({
          message: "Question not found with id " + req.params.questionId
        });
      }
      res.send(question);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).send({
          message: "Question not found with id " + req.params.questionId
        });
      }
      res.send(500).send({
        message: "Question not found with id " + req.params.questionId
      });
    });

}

// update a single question
exports.update = (req, res) => {

  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Input cannot be empty"
    });
  }

  // find the question and update it with the request body
  Question.findByIdAndUpdate(
    req.params.questionId,
    {
      statement: req.body.statement,
      solutions: req.body.solutions,
      difficultyLevel: req.body.difficultyLevel,
      category: req.body.category,
      subCategory: req.body.subCategory
    },
    {
      new: true
    })
  .then(question => {
    if (!question) {
      res.status(404).send({
        message: "Question not found with id " + req.params.questionId
      });
    }
    res.send(question);
  })
  .catch(err => {
    if (err.kind === 'ObjectId') {
      res.status(404).send({
        message: "Question not found with id " + req.params.questionId
      });
    }
    res.send(500).send({
      message: "Error updating question with id " + req.params.questionId
    });
  });

}

// delete a single question
exports.delete = (req, res) => {

  Question.findByIdAndRemove(req.params.questionId)
    .then(question => {
      if (!question) {
        res.status(404).send({
          message: "Question not found with id " + req.params.questionId
        });
      }
      res.send({message: "Question deleted successfully."});
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        res.status(404).send({
          message: "Question not found with id " + req.params.questionId
        });
      }
      res.send(500).send({
        message: "Could not delete question with id " + req.params.questionId
      });
    });

}

