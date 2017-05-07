'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var config = require('./config');
var server = express();

var api = require('./index');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_uri, (err) => {

    if (err) {
        throw err;
    }

    // CORS
    server.use((_, res, next) => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });

    server.use(morgan(':method :url | :status | :response-time ms'));
    server.use(express.static(__dirname));
    server.use(bodyparser.json({limit: '50mb'}));
    server.use('/api/:version', api);

    server.get('/', (req, res) => {
        res.sendFile('./index.html');
    });

    server.listen(config.server.port, (err) => {
        console.log(err || ('API is listening on port ' + config.server.port));
    });
});
