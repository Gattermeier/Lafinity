/**
 * Created by matthias on 1/6/15.
 */
var loggedIn = require('../middleware/loggedIn');
var createModalScript = require('../controllers/createModalScript');
var mongoose = require('mongoose');
var Modal = mongoose.model('Modal');


module.exports = function (app) {
    // create
    app.get("/modal/create", loggedIn, function (req, res) {
        res.render('modal/create.jade');
    })

    app.post("/modal/create", loggedIn, function (req, res, next) {
        var title = req.param('title');
        var modal_title_text = req.param('modal_title_text');
        /*var script_message = req.param('script_message');
         var script_button_text = req.param('script_button_text');
         var script_button_url = req.param('script_button_url');
         var script_cookie_expiration = req.param('script_cookie_expiration');*/
        var user = req.session.user;

        Modal.create({
            title: title
            , author: user
            , modal_title: {text: modal_title_text}
            /*, script_message: script_message
             , script_button_text: script_button_text
             , script_button_url: script_button_url
             , script_cookie_expiration : script_cookie_expiration*/
        }, function (err, modal) {
            if (err) return next(err);

            // create modal script file
            createModalScript();

            res.redirect('/modal/' + modal.id);
        });
    })

    // read and update
    app.get("/modal/:id", loggedIn, function (req, res, next) {
        res.render('modal/create.jade', {
            modal: Modal.findById(req.param('id'))
        });
    })

    app.post("/modal/:id", loggedIn, function(req, res, next){
        Modal.edit(req, function (err) {
            if (err) return next(err);
            var modal = req.body;
            modal.id = req.param('id');

            // re-create modal script file from scratch
            createModalScript();

            res.redirect("/modal/" + req.param('id'));
        })
    })

}
