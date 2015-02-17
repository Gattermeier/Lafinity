/**
 * Created by matthias on 1/6/15.
 */
var isAdmin = require('../middleware/isAdmin');
var loggedIn = require('../middleware/loggedIn');
module.exports = function (app) {

    app.get("/test", loggedIn, isAdmin, function (req, res) {
        res.render('test/test.jade');
    })

    app.get("/:type(discussion|page)", function (req, res, next) {
        console.log('log:', req.params);
        next();
    }, function (req, res, next) {
        res.render('test/test.jade', {page: req.params.type});
    })

}
