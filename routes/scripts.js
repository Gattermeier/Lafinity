/**
 * Created by matthias on 1/2/15.
 */
var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var Script = mongoose.model('Script');
var fs = require('fs');

// implement replaceAll function missing in JavaScript
// used by constuctScript function
function replaceAll(str, search, replace) {
    return str.replace(new RegExp(search, 'g'), replace);
}

// constructScript not in use anymore, should be cleaned out..
function constructScript(script) {

    // Read the basic template file to create a custom script
    fs.readFile('./api/gamma.js', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // values to replace as JSON object
        var construct =
        {
            "<%MODALCOOKIE%>": script.id
            , "<%MODALID%>": script.id
            , "<%HOURS%>": script.script_cookie_expiration
            , "<%SCRIPT_TITLE%>": script.script_title
            , "<%SCRIPT_MESSAGE%>": script.script_message
            , "<%SCRIPT_BUTTON_TEXT%>": script.script_button_text
            , "<%SCRIPT_BUTTON_URL%>": script.script_button_url
        };

        // replace the placeholders with actual values
        for (var key in construct) {
            if (construct.hasOwnProperty(key)) {
                data = replaceAll(data, key, construct[key]);
                //data = data.replace(key, construct[key]);
            }
        }

        // write the file
        fs.writeFile('public/api/' + script.id + '.js', data, function (err) {
            if (err) {
                console.log('error writing script file')
            }
        });
    });
}


module.exports = function (app) {

    app.get('/script', loggedIn, function (req, res) {
        //ToDO: should only render own (group's) assets
        Script.find({author: req.session.user}).sort('created').limit(10).exec(function (err, scripts) {
            if (err) return next(err);
            res.render('script/overview.jade', {scripts: scripts});
        })
    })

    // create
    app.get("/script/create", loggedIn, function (req, res) {
        res.render('script/create.jade');
    })

    app.post("/script/create", loggedIn, function (req, res, next) {
        var body = req.param('body');
        var title = req.param('title');
        var script_title = req.param('script_title');
        var script_title_tag = req.param('script_title_tag');
        var script_image_url = req.param('script_image_url');
        var script_image_position = req.param('script_image_position');
        var script_message = req.param('script_message');
        var script_button_text = req.param('script_button_text');
        var script_button_url = req.param('script_button_url');
        var script_button_align = req.param('script_button_align');
        var script_button_color = req.param('script_button_color');
        var script_button_font = req.param('script_button_font');
        var script_link_httptype = req.param('script_link_httptype');
        var script_cookie_expiration = req.param('script_cookie_expiration');
        var user = req.session.user;

        Script.create({
            title: title
            , author: user
            , script_title: script_title
            , script_title_tag: script_title_tag
            , script_message: script_message
            , script_image_url: script_image_url
            , script_image_position: script_image_position
            , script_button_text: script_button_text
            , script_button_url: script_button_url
            , script_button_color: script_button_color
            , script_button_font: script_button_font
            , script_button_align: script_button_align
            , script_link_httptype: script_link_httptype
            , script_cookie_expiration: script_cookie_expiration
        }, function (err, script) {
            if (err) {
                console.log(err);
            }

            // write script file
            //constructScript(script);

            var msg = 'Saved.';
            res.redirect('/script/edit/' + script.id, msg);
        });
    })


    // read
    app.get("/script/:id", function (req, res, next) {
        var id = req.param('id');

        var query = Script.findById(id).populate('author');
        query.exec(function (err, script) {

            if (err) {
                console.log(err);
            }

            if (!script) return next(); // 404

            res.render('script/view.jade', {script: script});
        })
    })


    // update
    app.get("/script/edit/:id", loggedIn, function (req, res, next) {
        res.render('script/create.jade', {
            script: Script.findById(req.param('id'))
        });
    })

    app.post("/script/edit/:id", loggedIn, function (req, res, next) {
        console.log('Debug request: ' + req);
        Script.edit(req, function (err) {
            if (err) return next(err);
            var script = req.body;
            script.id = req.param('id');
            console.log('Debug: ' + script);
            console.log('Debug: ' + script.id);
            //constructScript(script);

            // ToDo: After saving the preview will fail on page reload. Ehy why the heck? Sporadic issue only ?

            //res.render('script/create.jade',{msg: 'Saved.'});
            res.render('script/create.jade', {
                script: Script.findById(req.param('id')),
                message: 'Saved.'
            });
        })
    })


    // remove
    app.get("/script/remove/:id", loggedIn, function (req, res, next) {
        var id = req.param('id');

        Script.findOne({_id: id}, function (err, script) {
            if (err) {
                console.log('could not find in DB: ' + id + ' - ' + err)
            }

            // validate logged in user authored this post
            if (script.author != req.session.user) {
                //return res.send(403);
                return res.render('403.jade', {error: '403'});
            }
            // TODO display a confirmation msg to user

            script.remove(function (err) {
                if (err) {
                    console.log('Cannot remove script.. ' + err)
                }

                // write the file
                fs.unlink('public/api/' + id + '.js', function (err) {
                    if (err) {
                        console.log('error removing script file');
                    } else {
                        console.log('file removed');
                    }
                    res.redirect('/script');
                });


            })

        })
    })

    // API calls
    app.get("/s/api/:id", function (req, res, next) {
        var id = req.param('id');

        var query = Script.findById(id);
        query.exec(function (err, script) {
            if (err) return next(err);

            if (!script) return next(); // 404

            res.jsonp(script);
        })
    })


}
