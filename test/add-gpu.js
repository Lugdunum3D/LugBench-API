'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var Gpu = require('../v1/models/gpu');
var gpuTest = require('./gputest.js');
var server = require('../server.js');

/* jshint ignore:start*/
var should = chai.should();
/* jshint ignore:end*/

chai.use(chaiHttp);

before(done => {
    Gpu.remove({}, done);
});
after(done => {
    Gpu.remove({}, done);
});

describe('Gpus', () => {
    var id = '';

    describe('PUT /api/v1/gpus', () => {
        it('should PUT a new gpu into the database', done => {
            chai.request(server).put('/api/v1/gpus').send(gpuTest).end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                id = res.body.data._id;
                done();
            });
        });
    });

    describe('GET /api/v1/gpus', () => {
        it('should GET all gpus', done => {
            chai.request(server).get('/api/v1/gpus').end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(1);
                done();
            });
        });
    });

    describe(`GET /api/v1/gpus/${id}`, () => {
        it('should GET specific gpus', done => {
            chai.request(server).get(`/api/v1/gpus/${id}`).end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                done();
            });
        });
    });

});
