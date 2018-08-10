
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


// authorize a user
exports.authorize = (req, res, next) => {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        console.log('User authorized');
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token, return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }

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
