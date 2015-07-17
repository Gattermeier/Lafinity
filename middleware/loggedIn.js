
module.exports = function isLoggedIn (req, res, next) {
  if (!(req.session && req.session.user)) {
    console.log(req.session);
    console.log(req.session.user);

    return res.redirect('/login');
  }
  next();
}
