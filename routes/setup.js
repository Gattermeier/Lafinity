var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function(app) {

  app.get("/setup", function (req, res) {
    User.find('', function(err, user) {
      if (user.length < 1 || typeof user[0] === 'undefined') {
        console.log('setup init ..');
        res.render('setup.jade');
      } else {
        console.log('already setup..');
        res.redirect('/');
      } 
    })

  });

  app.post("/setup", function (req, res, next) {

    var email = cleanString(req.param('email'));
    var pass = cleanString(req.param('pass'));
    var first = cleanString(req.param('firstname'));
    var last = cleanString(req.param('lastname'));

    if (!(email && pass)) {
      return invalid();
    }

    crypto.randomBytes(16, function (err, bytes) {
      if (err) return next(err);

      var user = { _id: email };
      user.salt = bytes.toString('utf8');
      user.hash = hash(pass, user.salt);
      user.name = {first : first, last : last};
      user.roles = ['admin'];

      User.create(user, function (err, newUser) {
        if (err) {
          if (err instanceof mongoose.Error.ValidationError) {
            return invalid();
          }
          return next(err);
        }

        // user created successfully
        req.session.isLoggedIn = true;
        req.session.user = email;
        req.session.fullname = user.name.first + ' ' + user.name.last;
        req.session.roles =  user.roles;

        if (req.session.roles.indexOf('admin') > -1) {
          req.session.isAdmin = true;
        } else {
          req.session.isAdmin = false;
        }

        return res.redirect('/');
      });
    });

  })
}