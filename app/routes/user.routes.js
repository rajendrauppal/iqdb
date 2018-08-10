
module.exports = (app) => {

  const users = require('../controllers/user.controller');

  // authenticate a user
  app.post('/authenticate', users.authenticate);

  // create a new user
  app.post('/api/v1/users', users.create);

  // fetch all users
  app.get('/api/v1/users', users.findAll);

}
