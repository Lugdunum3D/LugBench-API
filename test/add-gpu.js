'use strict';

var assert = require('assert');
var mongoose = require('mongoose');
var config = require('../config');
var Gpu = require('../v1/models/gpu');
var gpuTest = require('./gputest.js');

mongoose.connect(config.mongodb_uri);

describe('Gpu', () => {
    beforeEach((done) => {
        Gpu.remove({}, done);
    });

    afterEach((done) => {
        Gpu.remove({}, done);
    });

    it('should add to database', (done) => {
        let gpu = new Gpu(gpuTest);

        gpu.save().then((doc) => {
            done();
        }, done);
    });

    it('should not add to database', (done) => {
        gpuTest.formats = 'error';
        let gpu = new Gpu(gpuTest);

        gpu.save().then(done, () => {
            done();
        });
    })

});
