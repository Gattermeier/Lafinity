
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');

// add mongoose query and promise support to express
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');


mongoose.set('debug', true);
mongoose.connect('mongodb://lafinity:lafinity@proximus.modulusmongo.net:27017/etedO6vy', function (err) {
  if (err) throw err;

  var app = express();
  app.use("/public", express.static(path.join(__dirname, 'public')));
  middleware(app);
  routes(app);

  app.listen(3000, function () {
    console.log('now listening on http://localhost:3000');
  })
})
