/**
 * Created by matthias on 1/7/15.
 */

var mongoose = require('mongoose');
var createdDate = require('../plugins/createdDate');

// define the schema
var schema = mongoose.Schema({
    title: { type: String, trim: true }
    , body: String
    , author: { type: String, ref: 'User' }
    , position: String
})


schema.statics.edit = function (req, callback) {
    var id = req.param('id');
    var author = req.session.user;

    // validate current user authored
    // ToDO this should be probably be extended to user / author groups
    var query = { _id: id, author: author };

    var update = {};
    update.title = req.param('title');
    //update.body = req.param('body');
    update.position = req.param('position');

    this.update(query, update, function (err, numAffected) {
        if (err) return callback(err);

        if (0 === numAffected) {
            return callback(new Error('nothing to modify'));
        }

        callback();
    })
}

// add created date property
schema.plugin(createdDate);

// compile the model
var MobileBar = mongoose.model('MobileBar', schema);

module.exports = MobileBar;