
// set NODE_ENV to test for testing duration
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Question = require('../app/models/question.model.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

// clear the database before running each test
describe('Questions', () => {

  beforeEach((done) => {
    Question.remove({}, (err) => {
      done();
    });
  });

  // test the /GET route
  describe('/GET question', () => {
    it('should GET all the questions', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          if (res) {
            res.should.have.status(200);
            done();
          }
        });
    });
  });

});

