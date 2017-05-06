'use strict';

var config = require('../config');

module.exports = (req, res, next) => {
  let accessToken = req.headers['x-access-token'];
  if(!accessToken) {
    res.status(401).send('Authentication token is required');
  } else if (accessToken !== config.auth_token) {
    res.status(401).send('Authentication token is not correct');
  }
  next();
};
