/**
 * Created by matthias on 1/14/15.
 */
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');
var mongoose = require('mongoose');
var Rules = mongoose.model('Rules');
var fs = require('fs');


module.exports = function (app) {
    // overview
    app.get('/rules/all', loggedIn, isAdmin, function(req, res){
        //ToDO: should only render own (group's) assets
        Rules.find({author : req.session.user}).sort('created').limit(10).exec(function (err, rules) {
            if (err) return next(err);
            res.render('rules/overview.jade', { rules: rules });
        })
    })

    // create
    app.get("/rules/create", loggedIn, isAdmin, function (req, res) {
        res.render('rules/manage.jade');
    })

    app.post('/rules/create', loggedIn, isAdmin, function(req, res) {
        var body = req.param('body');
        var title = req.param('title');
        var position = req.param('position');
        var user = req.session.user;

        Rules.create({
            title: title
            , author: user
            //, position: position

        }, function (err, rules) {
            if (err) {console.log(err)};

            // write script file
            //constructScript(script);

            res.redirect('/rules/edit/' + rules.id);
        });
    })


    //read and update
    app.get('/rules/edit/:id', loggedIn, isAdmin, function(req, res) {
        res.render('rules/manage.jade', {
            rules: Rules.findById(req.param('id'))
        });
    })

    app.post('/rules/edit/:id', loggedIn, isAdmin, function(req,res) {
        Rules.edit(req, function (err) {
            if (err) {console.log(err);}
            var rules = req.body;
            rules.id = req.param('id');
            //constructScript(script);
            res.redirect("/rules/edit/" + req.param('id'));
        })
    })


    // remove
    app.get("/rules/remove/:id", loggedIn, isAdmin, function (req, res, next) {
        var id = req.param('id');

        Rules.findOne({ _id: id }, function (err, rule) {
            if (err) {console.log('could not find in DB: '+id + ' - '+err)}

            // validate logged in user authored this post
            if (rule.author != req.session.user) {
                //return res.send(403);
                return res.render('403.jade', {error: '403' });
            }
            // TODO display a confirmation msg to user

            rule.remove(function (err) {
                if (err) {console.log('Cannot remove rule.. '+err)}

                // write the file
                /*fs.unlink('public/api/'+id+'.js', function (err) {
                    if (err) {
                        console.log('error removing script file')
                    }
                    console.log('file removed')
                    res.redirect('/');
                });*/
                res.redirect('/');
            })

        })
    })
}