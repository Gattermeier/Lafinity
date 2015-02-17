/**
 * Created by matthias on 1/7/15.
 */
var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var MobileBar = mongoose.model('MobileBar');
var fs = require('fs');


module.exports = function (app) {
    // overview
    app.get('/mobile', loggedIn, function(req, res){
        //ToDO: should only render own (group's) assets
        MobileBar.find({author : req.session.user}).sort('created').limit(10).exec(function (err, mobiles) {
            if (err) return next(err);
            res.render('mobile/overview.jade', { mobiles: mobiles });
        })
    })

    // create
    app.get("/mobile/create", loggedIn, function (req, res) {
        res.render('mobile/create.jade');
    })

    app.post('/mobile/create', loggedIn, function(req, res) {
        var body = req.param('body');
        var title = req.param('title');
        var position = req.param('position');
        var user = req.session.user;

        MobileBar.create({
            title: title
            , author: user
            , position: position

        }, function (err, mobile) {
            if (err) {console.log(err)};

            // write script file
            //constructScript(script);

            res.redirect('/mobile/edit/' + mobile.id);
        });
    })

    //read and update
    app.get('/mobile/edit/:id', loggedIn, function(req, res) {
        res.render('mobile/create.jade', {
            mobile: MobileBar.findById(req.param('id'))
        });
    })

    app.post('/mobile/edit/:id', loggedIn, function(req,res) {
        MobileBar.edit(req, function (err) {
            if (err) {console.log(err);}
            var mobile = req.body;
            mobile.id = req.param('id');
            //constructScript(script);
            res.redirect("/mobile/edit/" + req.param('id'));
        })
    })

}