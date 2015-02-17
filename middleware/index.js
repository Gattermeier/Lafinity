var express = require('express');

module.exports = function (app) {
  app.use(express.logger('dev'));


  app.use(express.cookieParser());
  app.use(express.session({ secret: 'buildings some awesome ngo services' }));
  app.use(express.bodyParser());

  // expose session to views
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  })
}
