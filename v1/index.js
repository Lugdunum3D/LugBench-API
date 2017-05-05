'use strict';

var express = require('express');
var mongoose = require('mongoose');

var Gpu = require('./models/gpu');
var router = express.Router();

router.put('/gpus', (req, res) => {
    var newGpu = new Gpu(req.body);
    newGpu.save().then((doc) => {
        res.status(200).send({
            data: doc
        });
    }, (err) => {
        res.status(500).send({
            err: err
        });
    });
});

router.get('/gpus', (req, res) => {
    Gpu.find().then((doc) => {
        res.status(200).send({
            data: doc
        });
    }, res.send);
});

router.get('/gpus/:id', (req, res) => {
    let id = req.params.id;

    Gpu.findOne({
        '_id': mongoose.Types.ObjectId(id)
    }).then((doc) => {
        res.status(200).send({
            data: doc
        });
    });
});

module.exports = router;
