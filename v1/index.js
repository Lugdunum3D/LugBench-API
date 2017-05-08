'use strict';

var express = require('express');
var mongoose = require('mongoose');

var Gpu = require('./models/gpu');
var router = express.Router();

router.put('/gpus', (req, res) => {
    if (!req.body || !req.body.length) {
        res.status(400).send('Missing object');
        return;
    }
    let newGpu = new Gpu(req.body);
    let promise = newGpu.save();

    promise.then((doc) => {
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
    let promise = Gpu.find().exec();
    promise.then((doc) => {
        res.status(200).send({
            data: doc
        });
    }, res.send);
});

router.get('/gpus/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        res.status(400).send('Missing id parameters');
    } else {
        Gpu.findOne({
            '_id': mongoose.Types.ObjectId(id)
        }).exec().then((doc) => {
            res.status(200).send({
                data: doc
            });
        });
    }
});

module.exports = router;
