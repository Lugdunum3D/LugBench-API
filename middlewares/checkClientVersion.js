"use strict"

const errors    = require('restify-errors')
const config    = require('../config')
const UserAgent = require('../common/userAgent')

module.exports.checkClientVersion = function(req, res, next) {
    if (!req.headers['user-agent']) {
        return next(new errors.UnauthorizedError('Bad user-agent'))
    }
    var ua = UserAgent.parse(req.headers['user-agent'])
    if (ua.family !== "LugBench"  || ua.version() !== config.client_version){
        return next(new errors.UnauthorizedError('Bad user-agent'))
    }
    next()
}
