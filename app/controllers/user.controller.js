
const User = require('../models/user.model');

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
