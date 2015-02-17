/**
 * Created by matthias on 1/7/15.
 */
var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function (app) {

    app.get("/profile/", loggedIn, function(req,res){
        User.findOne({ _id: req.session.user }, function (err, user) {
            if (err) (console.log(err));
            //req.session.userinfo = user;
            req.session.username = user.name;


            res.render('user/edit.jade');
        })

    })

    app.get("/profile/:id", loggedIn, function(req,res){
        /*User.findOne({ _id: req.session.user }, function (err, user) {
            if (err) (console.log(err));
            //req.session.userinfo = user;
            req.session.username = user.name;
            console.log(req.session);
            console.log('test');
            res.render('user/edit.jade');
        })*/
        res.redirect('/profile');

    })

    app.post("/profile/", loggedIn, function(req, res, next) {

        // ToDO: We need logic here that only allows user to edit own info .. or an admin...
        console.log(req);

        User.edit(req, function (err) {
            if (err) return next(err);
            var user = req.body;
            //user.id = req.param('id');
            //constructScript(script);
            res.render("user/edit.jade", {success: true});
        })

    })



    /*
    app.post('/login', function (req, res, next) {
        // validate input
        var email = cleanString(req.param('email'));
        var pass = cleanString(req.param('pass'));
        if (!(email && pass)) {
            return invalid();
        }

        // user friendly
        email = email.toLowerCase();

        // query mongodb
        User.findById(email, function (err, user) {
            if (err) return next(err);

            if (!user) {
                return invalid();
            }

            // check pass
            if (user.hash != hash(pass, user.salt)) {
                return invalid();
            }

            req.session.isLoggedIn = true;
            req.session.fullname = user.fullname;
            req.session.user = email;

            res.redirect('/');
        })

        function invalid () {
            return res.render('login.jade', { invalid: true });
        }
    }) */

}
// /profile/"+session.user