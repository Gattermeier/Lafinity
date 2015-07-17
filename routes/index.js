var errors = require('./errors');
var setup = require('./setup');
var user = require('./user');
var login = require('./login');
var admin = require('./admin');

//var posts = require('./posts');
var scripts = require('./scripts');
var rules = require('./rules');
var polls = require('./polls');
var modal = require('./modal');
var mobile = require('./mobile');


var test = require('./test');
var mongoose = require('mongoose');

var isAdmin = require('../middleware/isAdmin');
var isLoggedIn = require('../middleware/loggedin');


//var BlogPost = mongoose.model('BlogPost');
var Script = mongoose.model('Script');
var Modal = mongoose.model('Modal');
var MobileBar = mongoose.model('MobileBar');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res, next) {
    /*BlogPost.find().sort('created').limit(10).exec(function (err, posts) {
      if (err) return next(err);
      res.render('home.jade', { posts: posts });
    })*/
    /*Script.find().sort('created').limit(10).exec(function (err, scripts) {
      if (err) return next(err);
      res.render('home.jade', { scripts: scripts });
    })*/
    res.render('home.jade');

  })

  app.get('/tools', function (req, res, next) {
    res.render('tools.jade');
  })
  app.get('/rules', function (req, res, next) {
    res.render('rules.jade');
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

  // blog post crud
  //posts(app);

  // script crud
  scripts(app);
  // conditions crud
  rules(app);
  // polls crud
  polls(app);
  // mobile crud
  mobile(app);

  // modal crud (merge with scripts)
  modal(app);

  // routes for testing
  // test(app);

  // error handlers
  errors(app);

}
