'use strict';

var assert = require('assert');
var mongoose = require('mongoose');
var config = require('../config');
var Gpu = require('../v1/models/gpu');
var gpuTest = require('./gputest.js');

mongoose.connect(config.mongodb_uri);

describe('Gpu', () => {
    beforeEach((done) => {
        Gpu.removeAll(done);
    });

    afterEach((done) => {
        Gpu.removeAll(done);
    });

    it('should add to database', (done) => {
        Gpu.add(gpuTest, done);
    });

    it('should not add to database', (done) => {
        gpuTest.formats = 'error';
        Gpu.add(gpuTest, (err, doc) => done(doc));
    })

});
