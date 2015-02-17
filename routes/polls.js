/**
 * Created by matthias on 1/13/15.
 */
var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var MobileBar = mongoose.model('MobileBar');
var fs = require('fs');


module.exports = function (app) {
    // overview
    /*app.get('/polls', loggedIn, function (req, res) {
        //ToDO: should only render own (group's) assets
        MobileBar.find({author: req.session.user}).sort('created').limit(10).exec(function (err, polls) {
            if (err) return next(err);
            res.render('polls/overview.jade', {polls: polls});
        })
    })*/

    // create
    app.get("/polls/create", loggedIn, function (req, res) {
        res.render('polls/create.jade');
    })
}