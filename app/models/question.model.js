#!/usr/bin/env node

'use strict';

const mongoose = require('mongoose');

const solutionSchema = mongoose.Schema(
  {
    solution: String,
    timeComplexity: String,
    spaceComplexity: String
  },
  {
    _id: false,
    timestamps: false
  }
);

const questionSchema = mongoose.Schema(
  {
    statement: String,
    solutions: [solutionSchema],
    difficultyLevel: Number,
    category: String,
    subCategory: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Question', questionSchema);

