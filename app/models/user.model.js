
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: String,
    password: String,
    admin: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
