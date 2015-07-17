
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');

// add mongoose query and promise support to express
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');

var port = process.env.PORT || 3000;

var favicon = require('serve-favicon');

// var mongoPath = 'mongodb://lafinity:lafinity@proximus.modulusmongo.net:27017/etedO6vy';

mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/lafinity013', function (err) {
    if (err) { console.log(err) };

    var app = express();

    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use("/public", express.static(path.join(__dirname, 'public')));

    middleware(app);
    routes(app);

    app.listen(port, function () {
        console.log('Server running on port ' + process.env.PORT);
    })
})

