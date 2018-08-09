
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


// authenticate a user, create and send token
exports.authenticate = (req, res) => {

  User.findOne({
    name: req.body.name
  })
  .then(user => {
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      })
    }
    else if (user) {
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        })
      } else {
        let payload = {admin: user.admin};
        let token = jwt.sign(payload, req.app.get('superSecret'), {
          expiresIn: '24h'
        });
        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        })
      }
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the user."
    });
  });

}


// create and save a new user
exports.create = (req, res) => {

  // create a sample user
  const apiUser = new User({
    name: 'Rajendra Uppal',
    password: 'df9pwq3rinpbwvu01fq37m7qf2i',
    admin: true
  });

  // save the sample user
  apiUser.save()
    .then(data => {
      res.send(data);
      console.log('User created successfully');
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving the Question."
      });
    });

}


// fetch and return all users from mongodb
exports.findAll = (req, res) => {

  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching all users."
      });
    });

}
