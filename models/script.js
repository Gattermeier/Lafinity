/**
 * Created by matthias on 1/2/15.
 */

var mongoose = require('mongoose');
var createdDate = require('../plugins/createdDate');

// define the schema
var schema = mongoose.Schema({
    title: { type: String, trim: true }
    //, body: String
    , author: { type: String, ref: 'User' }

    // script content
    , script_title: String
    , script_title_tag: String
    , script_image_url : String
    , script_image_position: String
    , script_message: String
    , script_button_text: String
    , script_button_url: String
    , script_button_tag: String
    , script_button_align : String
    , script_button_color : String
    , script_button_font : String
    , script_link_httptype: String

    // NEW
    , script_button: {text: String, url: {http : String, target: String}, tag: String, classes: String}

    // script logic
    , script_active: Boolean
    , script_cookie_expiration: Number

    // NEW
    , script_logic: {active: Boolean, expiration: Number}

    , stats: Number

})


schema.statics.edit = function (req, callback) {
    var id = req.param('id');
    //console.log('script (modal) model, edit function, ID of req is: '+ id); // debug
    var author = req.session.user;

    // validate current user authored this script
    // ToDO this should be probably be extended to user / author groups
    var query = { _id: id, author: author };
    // console.log(query); // debug

    var update = {};
    update.title = req.param('title');
    update.body = req.param('body');
    update.script_title = req.param('script_title');
    update.script_title_tag = req.param('script_title_tag');
    update.script_message = req.param('script_message');
    update.script_image_url = req.param('script_image_url');

    console.log(update.script_image_url);

    update.script_image_position = req.param('script_image_position');
    update.script_button_text = req.param('script_button_text');
    update.script_button_url = req.param('script_button_url');
    update.script_cookie_expiration = req.param('script_cookie_expiration');
    update.script_button_align = req.param('script_button_align');
    update.script_button_color = req.param('script_button_color');
    update.script_button_font = req.param('script_button_font');
    update.script_link_httptype = req.param('script_link_httptype');

    this.update(query, update, function (err, numAffected) {
        if (err) return callback(err);

        if (0 === numAffected) {
            return callback(new Error('no script to modify'));
        }

        callback();
    })
}


schema.statics.stats = function (req, stats, callback) {
    var id = req.param('id');
    var query = { _id: id };
    if (stats === undefined) { stats = 1; } else {stats++;}
    var update = {}
    update.stats = stats;

    this.update(query, update, function (err, numAffected) {
        if (err) return callback(err);

        if (0 === numAffected) {
            return callback(new Error('no script to modify'));
        }

        callback();
    })

    // var statsUpdate = {calls: calls+1 }
    console.log(stats);

}

// add created date property
schema.plugin(createdDate);

// when new scripts are created, lets do something
// npm install mongoose-lifecycle
// http://plugins.mongoosejs.com?q=events

var lifecycle = require('mongoose-lifecycle');
schema.plugin(lifecycle);

// compile the model
var Script = mongoose.model('Script', schema);

// handle events
/*
Script.on('afterInsert', function (script) {
    var url = "http://localhost:3000/script/";
    console.log('executed afterInsert()', url, script.id);
})*/


module.exports = Script;
