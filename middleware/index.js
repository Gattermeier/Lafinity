var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(session({
    secret: 'building some awesome ngo services',
    saveUninitialized: true,
    resave: true
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  // expose session to views
  app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  })
}