'use strict';

var config = require('../config');

const methodToCatch = ['PUT', 'DELETE', 'POST'];

module.exports = (req, res, next) => {
    if (methodToCatch.indexOf(req.method) !== -1) {
        let accessToken = req.headers['x-access-token'];
        if (!accessToken) {
            res.status(401).send('Authentication token is required');
        } else if (accessToken !== config.auth_token) {
            res.status(401).send('Authentication token is not correct');
        } else {
            next();
        }
    }
};
