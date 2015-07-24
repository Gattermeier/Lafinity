var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var app = express();

var config = require('./config/config')();

// add mongoose query and promise support to express
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');

var port = process.env.PORT || 3000;

var favicon = require('serve-favicon');


mongoose.connect(config, function(err) {
  if (err) {
    console.log(err)
  };

  app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use("/public", express.static(path.join(__dirname, 'public')));
  app.use("/assets", express.static(path.join(__dirname, 'bower_components')));

  middleware(app);
  routes(app);

  app.listen(port, function() {
    console.log('Server running on port ' + process.env.PORT);
  })
})