var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function(app) {

  app.get('/signup', function(req, res) {
    res.render('signup.jade');
  });

  // create new account
  app.post('/signup', function(req, res, next) {
    var email = cleanString(req.param('email'));
    var pass = cleanString(req.param('pass'));
    var first = cleanString(req.param('firstname'));
    var last = cleanString(req.param('lastname'));

    if (!(email && pass)) {
      return invalid();
    }



    User.findById(email, function(err, user) {
      if (err) return next(err);

      if (user) {
        return res.render('signup.jade', {
          exists: true
        });
      }


      crypto.randomBytes(16, function(err, bytes) {
        if (err) return next(err);

        var user = {
          _id: email
        };
        user.salt = bytes.toString('utf8');
        user.hash = hash(pass, user.salt);
        user.name = {
          first: first,
          last: last
        };
        user.roles = [];

        User.create(user, function(err, newUser) {
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
          req.session.roles = user.roles;

          if (req.session.roles.indexOf('admin') > -1) {
            req.session.isAdmin = true;
          } else {
            req.session.isAdmin = false;
          }
          //req.session.fullname = fullname;
          // console.log('created user: %s', email);
          return res.redirect('/');
        })
      })
    })

    function invalid() {
      return res.render('signup.jade', {
        invalid: true
      });
    }
  });


  app.get('/login', function(req, res) {
    res.render('login.jade');
  })

  app.post('/login', function(req, res, next) {
    // validate input
    var email = cleanString(req.param('email'));
    var pass = cleanString(req.param('pass'));
    if (!(email && pass)) {
      return invalid();
    }

    // user friendly
    email = email.toLowerCase();

    // query mongodb if user exists
    User.findById(email, function(err, user) {
      if (err) return next(err);

      if (!user) {
        return invalid();
      }

      // check pass
      if (user.hash !== hash(pass, user.salt)) {
        return invalid();
      }

      req.session.isLoggedIn = true;
      req.session.fullname = user.fullname;
      req.session.user = email;
      req.session.roles = user.roles;

      if (req.session.roles.indexOf('admin') > -1) {
        req.session.isAdmin = true;
        res.redirect('/admin/dashboard');
      } else {
        req.session.isAdmin = false;
      }

      res.redirect('/');
    })

    function invalid() {
      return res.render('login.jade', {
        invalid: true
      });
    }
  })

  app.get('/logout', function(req, res) {
    req.session.isAdmin = false;
    req.session.isLoggedIn = false;
    req.session.user = null;
    req.session.roles = null;
    res.redirect('/'); // maybe redirect here to some upsell page ..
  })
}