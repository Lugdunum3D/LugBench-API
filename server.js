'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var config = require('./config');
var server = express();

var api = require('./index');
var middlewareCORS = require('./middlewares/cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri, (err) => {

    if (!config.authToken) {
        throw 'Missing environment token';
    }

    if (err) {
        throw err;
    }

    server.use(middlewareCORS);
    server.use(morgan(':method :url | :status | :response-time ms'));
    server.use(express.static(__dirname));
    server.use(bodyparser.json({
        limit: '50mb'
    }));
    server.use('/api/:version', api);

    server.get('/', (req, res) => res.sendFile('./index.html'));

    server.listen(config.server.port, (err) => console.log(err || ('API is listening on port ' + config.server.port)));
});

module.exports = server;
