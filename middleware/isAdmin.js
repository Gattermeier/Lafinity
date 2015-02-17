/**
 * Created by matthias on 1/14/15.
 */
module.exports = function isAdmin (req, res, next) {
    if (req.session && req.session.roles) {
        if (req.session.roles.indexOf('admin') < 0) {
            return res.render('403.jade', {error: '403' });
        } else {
            next();
        }
    } else {
        return res.redirect('/');
    }
}