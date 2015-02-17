/**
 * Created by matthias on 1/15/15.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');

module.exports = function(app) {
    app.get('/admin/dashboard', loggedIn, isAdmin, function(req,res){
        res.render('admin/overview.jade');
    })

    app.get('/admin/clients', loggedIn, isAdmin, function(req,res){
        res.render('admin/clients.jade');
    })

    app.get('/admin/platform', loggedIn, isAdmin, function(req,res){
        res.render('admin/platform.jade');
    })
}