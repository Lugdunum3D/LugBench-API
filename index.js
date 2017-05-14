"use strict";

var express = require('express');

module.exports = function(req, res, next) {
    try {
        let version = require(`./${req.params.version}`);
        version(req, res, next);
    } catch (e) {
        if (e.code == "MODULE_NOT_FOUND") {
            res.status(404).send();
        } else {
            res.status(e.code).send();
        }
    }
};
