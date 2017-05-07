'use strict';

var express = require('express');
var mongoose = require('mongoose');

var Gpu = require('./models/gpu');
var router = express.Router();

router.put('/gpus', (req, res) => {
    let gpu = new Gpu(req.body);
    gpu.save((err, doc) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                data: doc
            });
        }
    });
});

router.get('/gpus', (req, res) => {
    Gpu.find({}, (err, docs) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                data: docs
            });
        }
    });
});

router.get('/gpus/:id', (req, res) => {
    let id = req.params.id;

    Gpu.findOne({
        '_id': mongoose.Types.ObjectId(id)
    }, (err, doc) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                data: doc
            });
        }
    });
});

module.exports = router;
