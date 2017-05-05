var assert = require('assert');
var mongoose = require('mongoose');
var config = require('../config');
var Gpu = require('../v1/models/gpu');

var gpuTest = require('./gputest.js');
var gpuErrorTest = require('./gpuErrorTest.js');

describe('Addition of gpu to database', () => {
  describe('Connection to database', () => {
    it('should connect to database', (done) => {
      mongoose.Promise = global.Promise;
      mongoose.connect(config.mongodb_uri, done);
    });
  });

  describe('Add object json', () => {
    it('should failed to create', (done) => {
      let gpu = new Gpu(gpuErrorTest);

      gpu.save().then((doc) => {
        assert('Succeed', 'That\'s not normal.')
      }, (err) => {
        done();
      });
    });

    it('should add to database', (done) => {
      let gpu = new Gpu(gpuTest);

      gpu.save().then((doc) => {
        done();
      });
    });
  });
});
