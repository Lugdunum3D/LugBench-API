"use strict"

const config = require('../config')

module.exports.checkClientVersion = function(req, res, next) {
    if (!req.headers['user-agent']) {
        res.send(401)
    }
    var ua = UserAgent.parse(req.headers['user-agent'])
    if (ua.family)
}