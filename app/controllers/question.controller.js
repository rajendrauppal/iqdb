#!/usr/bin/env node

'use strict';

const Question = require('../models/question.model');

// create and save a new question
exports.create = (req, res) => {
  console.log("create a question");
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
    // solutions: [{
    //   solution: req.body.solution,
    //   timeComplexity: req.body.timeComplexity,
    //   spaceComplexity: req.body.spaceComplexity
    // }],
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
        message: err.message || "Some error occurred in saving the Question."
      });
    });

}

// fetch and return all questions from mongodb
exports.findAll = (req, res) => {

}

// fetch and return a single question
exports.findOne = (req, res) => {

}

// update a single question
exports.update = (req, res) => {

}

// delete a single question
exports.delete = (req, res) => {

}

