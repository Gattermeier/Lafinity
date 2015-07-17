var errors = require('./errors');
var setup = require('./setup');
var user = require('./user');
var login = require('./login');
var admin = require('./admin');

//var posts = require('./posts');
var scripts = require('./scripts');
var modal = require('./modal');

var mongoose = require('mongoose');

var isAdmin = require('../middleware/isAdmin');
var isLoggedIn = require('../middleware/loggedin');


var Script = mongoose.model('Script');
var Modal = mongoose.model('Modal');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res, next) {
    /*Script.find().sort('created').limit(10).exec(function (err, scripts) {
      if (err) return next(err);
      res.render('home.jade', { scripts: scripts });
    })*/
    res.render('home.jade');

  })

  app.get('/tools', function (req, res, next) {
    res.render('tools.jade');
  })
  app.get('/services', function (req, res, next) {
    res.render('services.jade');
  })
  // login / logout routes
  login(app);
  // user routes
  user(app);
  // setup routes
  setup(app);
  // admin routes
  admin(app);
  // script crud
  scripts(app);
  // modal crud (merge with scripts)
  modal(app);
  // error handlers
  errors(app);

}
