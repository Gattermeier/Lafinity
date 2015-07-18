var mongoose = require('mongoose');
var createdDate = require('../plugins/createdDate');
var validEmail = require('../helpers/validate/email');
var isAdmin = require('../middleware/isAdmin');

var schema = mongoose.Schema({
  _id: {
    type: String,
    lowercase: true,
    trim: true,
    validate: validEmail
  },
  name: {
    first: String,
    last: String
  },
  roles: Array,
  org: {
    type: String
  },
  orgRole: Array,
  salt: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});



schema.statics.adminEdit = function(req, callback) {
  // if (isAdmin) ?
  console.log('adminEdit invoked..');
}

schema.statics.edit = function(req, callback) {

  // validate current user authored this script
  // ToDO this should be probably be extended to user / author groups
  var current_user = req.session.user;
  var query = {
    _id: current_user
  };

  var update = {};
  update.name = {
    first: req.param('first'),
    last: req.param('last')
  };
  console.log('DEBUG: ' + update);

  this.update(query, update, function(err, numAffected) {
    if (err) return callback(err);
    if (0 === numAffected) {
      return callback(new Error('nothing to modify'));
    }
    callback();
  })
}

// add created date property
schema.plugin(createdDate);

// properties that do not get saved to the db
schema.virtual('fullname').get(function() {
  return this.name.first + ' ' + this.name.last;
})

module.exports = mongoose.model('User', schema);