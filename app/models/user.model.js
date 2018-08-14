
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

class Card {

  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  setOffer(offer) {
    this.offer = offer;
  }

  getOffer() {
    return this.offer.getOffer();
  }

}

module.exports = mongoose.model('User', userSchema);
module.exports = Card;
