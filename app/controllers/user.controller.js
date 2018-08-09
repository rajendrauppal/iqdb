
const User = require('../models/user.model');

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
