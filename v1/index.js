'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var gpu = (require('./models/gpu'))();

router.put('/gpus', (req, res) => {
    gpu(req.body).save().then((doc) => {
        res.send({
            data: doc,
            status: 200
        });
    }, (err) => {
        res.send({
            err: err,
            status: 500
        });
    });
});

router.get('/gpus', (req, res) => {
    gpu.find().then((doc) => {
        res.status(200).send({
            data: doc
        });
    }, res.send);
});

router.get('/gpus/:id', (req, res) => {
    let id = req.params.id;

    gpu.findOne({
        '_id': mongoose.Types.ObjectId(id)
    }).then((doc) => {
        res.send({
            status: 200,
            data: doc
        });
    });
});

module.exports = router;
