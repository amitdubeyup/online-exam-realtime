var jwt = require('jsonwebtoken');
var config = require('../config');

function authGuard(req, res, next) {
  var token = req.body['token'] || req.query['token'] || req.headers['token'];
  if (token) {
    jwt.verify(token, config.serverSecret, function(err, decoded) {
      if (err) {
        const errorData = err;
        if (errorData.message === 'jwt expired') {
          res.status(400);
          return res.json({
            success: false,
            message: 'Session expired!',
          });
        } else {
          res.status(400);
          return res.json({
            success: false,
            message: 'Authentication failed!',
          });
        }
      } else {
        req['token'] = decoded.data;
        next();
      }
    });
  } else {
    res.status(400);
    return res.json({
      success: false,
      message: 'Unauthorized access!',
    });
  }

}

module.exports = authGuard;