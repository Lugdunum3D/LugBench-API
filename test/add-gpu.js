'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var mongoose = require('mongoose');
var config = require('../config');
var Gpu = require('../v1/models/gpu');
var gpuTest = require('./gputest.js');
var server = require('../server.js');

chai.use(chaiHttp);

before(done => {
    Gpu.remove({}, done);
});
after(done => {
    Gpu.remove({}, done);
});

describe('Gpus', () => {
    var id = '';

    describe('PUT /api/v1/gpus', _ => {
        it('should PUT a new gpu into the database', done => {
            chai.request(server).put('/api/v1/gpus').send(gpuTest).end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                id = res.body.data._id;
                done();
            });
        });
    });

    describe('GET /api/v1/gpus', _ => {
        it('should GET all gpus', done => {
            chai.request(server).get('/api/v1/gpus').end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                done();
            });
        });
    });

    describe(`GET /api/v1/gpus/${id}`, _ => {
        it('should GET specific gpus', done => {
            chai.request(server).get(`/api/v1/gpus/${id}`).end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                done();
            });
        });
    });

});
