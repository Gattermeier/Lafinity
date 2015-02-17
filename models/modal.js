/**
 * Created by matthias on 1/6/15.
 */


var mongoose = require('mongoose');
var createdDate = require('../plugins/createdDate');

// define the schema
var schema = mongoose.Schema({
    title: { type: String, trim: true }
    //, body: String
    , author: { type: String, ref: 'User' }

    // modal content
    , modal_template: String
    , modal_title: {text: String, tag: String, classes: String}
    , modal_message: String
    , modal_elements: {}
    , modal_image: {url: String}
    , modal_button: {text: String, url: {http : String, target: String}, tag: String, classes: String}


    // modal configuration
    , modal_config: {active: Boolean, expiration: Number}

});

schema.statics.edit = function (req, callback) {
    var id = req.param('id');
    var author = req.session.user;

    // validate current user authored this script
    // ToDO this should be probably be extended to user / author groups
    var query = { _id: id, author: author };

    var update = {};
    update.title = req.param('title');
    //update.body = req.param('body');
    update.modal_title = {
        text: req.param('modal_title')
    };
    update.modal_message = req.param('modal_message');
    update.modal_button = {
          text : req.param('modal_button_text')
        , url : req.param('modal_button_url')
    };
    update.modal_config = {
        expiration : req.param('modal_config_expiration')
    };

    this.update(query, update, function (err, numAffected) {
        if (err) return callback(err);

        if (0 === numAffected) {
            return callback(new Error('no script to modify'));
        }

        callback();
    })
}


// add created date property
schema.plugin(createdDate);

// compile the model
var Modal = mongoose.model('Modal', schema);

module.exports = Modal;