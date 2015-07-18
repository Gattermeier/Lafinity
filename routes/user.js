/**
 * Created by matthias on 1/7/15.
 */
var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function(app) {

    app.get("/profile/", loggedIn, function(req, res) {
        User.findOne({
            _id: req.session.user
        }, function(err, user) {
            if (err)(console.log(err));
            //req.session.userinfo = user;
            req.session.username = user.name;
            res.render('user/edit.jade');
        })
    })

    app.get("/profile/:id", loggedIn, function(req, res) {

        // we do not allow anyone to look at someone else' profile (except for admins?)
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
        // might be solved impllicitly as we redirect calls from /profile/:id to /profile which loads currently logged in user info

        User.edit(req, function(err) {
            if (err) return next(err);
            var user = req.body;
            res.render("user/edit.jade", {
                success: true
            });
        })
    })

}