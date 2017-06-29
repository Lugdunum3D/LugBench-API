"use strict"

const config    = require('../config')
const UserAgent = require('../common/userAgent')

module.exports.checkClientVersion = function(req, res, next) {
    if (!req.headers['user-agent']) {
        return res.send(401)
    }
    var ua = UserAgent.parse(req.headers['user-agent'])
    if (ua.family !== "LugBench"  || ua.version() !== config.client_version){
        return res.send(401)
    }
    next()
}
