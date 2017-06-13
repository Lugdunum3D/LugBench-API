'use strict';

var express = require('express');
var mongoose = require('mongoose');
var middlewareAuth = require('../middlewares/authentication');

var Gpu = require('./models/gpu');
var vendors = require('./models/vendors');
var router = express.Router();

router.put('/gpus', (req, res) => {
    if (!req.body) return res.status(400).send('Missing object.');

    if (req.body.properties.vendorID) {
      var vendorID = req.body.properties.vendorID.toString(16).toUpperCase();
      req.body.properties.vendorName = vendors[vendorID];
    }

    let newGpu = new Gpu(req.body);

    newGpu.save().then((doc) => {
        res.status(200).send({
            data: doc
        });
    }, err => {
        res.status(500).send({
            err: err
        });
    });
});

router.put('/gpus/:id', middlewareAuth, (req, res) => {
    if (!req.params.id) return res.status(400).send('Missing id parameter.');
    if (!req.body) return res.status(400).send('Missing object');

    if (req.body.properties.vendorID) {
      var vendorID = req.body.properties.vendorID.toString(16).toUpperCase();
      req.body.properties.vendorName = vendors[vendorID];
    }

    Gpu.update({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, {
        $set: req.body
    }).then(doc => {
        res.status(200).send({
            data: doc
        });
    }, err => {
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
    }, err => {
        res.status(500).send({
            err: err
        });
    });
});

router.get('/gpus/:id', (req, res) => {
    if (!req.params.id) return res.status(400).send('Missing id parameter.');

    Gpu.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    }).then((doc) => {
        res.status(200).send({
            data: doc
        });
    }, err => {
        res.status(500).send({
            err: err
        });
    });
});

module.exports = router;
