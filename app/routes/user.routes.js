
module.exports = (app) => {

  const users = require('../controllers/user.controller');

  // create a new user
  app.post('/users', users.create);

  // fetch all users
  app.get('/users', users.findAll);

}
