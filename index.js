var express = require('express');
var router = express.Router();

module.exports = function(req, res, next) {
    try {
        let version = require(`./${req.params.version}`);
        version(req, res, next);
    } catch (e) {
        if (e.code == "MODULE_NOT_FOUND") {
            res.send(405);
        } else {
            res.send(e.code);
        }
    }
};
